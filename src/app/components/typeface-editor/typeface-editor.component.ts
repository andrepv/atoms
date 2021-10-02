import { Component, Inject, OnInit } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';
import { getContentManagerProvider } from '../../services/get-content-manager-provider';
import { StoreService } from '../../services/store.service';
import { Font, FontManagerService } from './font-manager.service';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';

const {token, provider} = getContentManagerProvider(db.typeface);

@Component({
  selector: 'app-typeface-editor',
  templateUrl: './typeface-editor.component.html',
  styleUrls: ['./typeface-editor.component.less'],
  providers: [provider]
})
export class TypefaceEditorComponent implements OnInit {
  tokenName = '';
  categoryOptions = [
    {name: 'sans-serif', value: true},
    {name: 'serif', value: true},
    {name: 'display', value: true},
    {name: 'handwriting', value: true},
    {name: 'monospace', value: true},
  ];
  
  private destroy$ = new Subject();

  private searchChange$ = new BehaviorSubject('');
  searchValue = '';

  get content() {
    return this.store.editor.content;
  }

  ds: MyDataSource;

  constructor(
    @Inject(token) 
    public contentManager: ContentManagerService,
    public store: StoreService,
    public fontManager: FontManagerService,
  ) {}

  ngOnInit() {
    this.store.editor.content$
    .pipe(takeUntil(this.destroy$))
    .subscribe(value => this.tokenName = value?.token.name ?? '');

    this.fontManager.loadFonts();

    this.fontManager.fonts$.subscribe(() => {
      this.ds = new MyDataSource(this.fontManager);
    })

    this.searchChange$.pipe(
      takeUntil(this.destroy$),
      debounceTime(500),
      distinctUntilChanged(),
      tap(value => this.fontManager.filterByName(value))
    ).subscribe();
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  search() {
    this.searchChange$.next(this.searchValue);
  }

  selectFont(font: Font) {
    this.fontManager.addStylesheet({
      fonts: [font],
      onload: () => {
        this.contentManager.setTokenValue(font, this.content.token.id, this.content.group.id)
      },
      preview: false
    });
  }

  async onBlur() {
    const {token, group} = this.content;
    if (!this.tokenName.length || this.tokenName === token.name) {
      this.tokenName = token.name;
      return;
    }
    try {
      await this.contentManager.renameToken(this.tokenName, token.id, group.id);
    } catch {
      this.tokenName = token.name;
    }
  }
}


class MyDataSource extends DataSource<Font> {
  private pageSize = 20;
  private cachedData: Font[] = [];
  private fetchedPages = new Set<number>();
  private readonly dataStream = new BehaviorSubject<Font[]>(this.cachedData);
  private complete$ = new Subject<void>();
  private disconnect$ = new Subject<void>();

  constructor(private fontManager: FontManagerService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Font[]> {
    this.setup(collectionViewer);
    return this.dataStream;
  }

  disconnect(): void {
    this.disconnect$.next();
    this.disconnect$.complete();
  }

  private setup(collectionViewer: CollectionViewer) {
    this.fetchPage(0);

    collectionViewer.viewChange.pipe(
      takeUntil(this.complete$),
      takeUntil(this.disconnect$)
    ).subscribe(range => {
      if (this.cachedData.length >= this.fontManager.fonts.length) {
        this.complete$.next();
        this.complete$.complete();
      } else {
        const endPage = this.getPageForIndex(range.end);
        this.fetchPage(endPage + 1);
      }
    });
  }

  private fetchPage(page: number) {
    if (this.fetchedPages.has(page)) {
      return;
    }
    this.fetchedPages.add(page);

    const fonts = this.fontManager.fonts.slice(
      page * this.pageSize,
      (page + 1) * this.pageSize
    );

    this.fontManager.addStylesheet({
      fonts,
      onload: () => {
        this.cachedData.splice(
          page * this.pageSize,
          this.pageSize,
          ...fonts
        );
        this.dataStream.next(this.cachedData);
      },
    });
  }

  private getPageForIndex(index: number) {
    return Math.floor(index / this.pageSize);
  }
}