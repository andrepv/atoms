import { Component, EventEmitter,OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { Font, FontManagerService } from '../font-manager.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { GoogleFontsManager } from './google-fonts-manager';
import { GoogleFont } from '../../../sections/typeface/typeface.model';

@Component({
  selector: 'app-google-fonts',
  templateUrl: './google-fonts.component.html',
  styleUrls: ['./google-fonts.component.less'],
})
export class GoogleFontsComponent implements OnInit {

  @Output() save: EventEmitter<GoogleFont> = new EventEmitter();

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

  ds: MyDataSource;

  fontManager: GoogleFontsManager;

  get sortOptions() {
    return this.fontManager.SORT_OPTIONS.map(option => this.getSortOptionName(option));
  }

  constructor(fontManager: FontManagerService) {
    this.fontManager = fontManager.googleFonts;
  }

  ngOnInit() {
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

  sort(option: string) {
    this.fontManager.sort(this.getSortOptionValue(option))
  }

  get sortOption() {
    return this.getSortOptionName(this.fontManager.sortOption);
  }

  selectFont(font: GoogleFont) {
    const {variants, subsets, category, family} = font;
    this.fontManager.addStylesheet({
      fonts: [font],
      onload: () => {
        this.save.emit({
          family,
          variants,
          subsets,
          category,
          type: 'google-fonts'
        })
      },
      preview: false
    });
  }

  private getSortOptionName(option: string) {
    const map = {
      popularity: 'Popular',
      date: 'Newest',
      alpha: 'Name',
      style: 'Number of styles',
      trending: 'Trending',
    }

    return map[option];
  }

  private getSortOptionValue(option: string) {
    const map = {
      'Popular': 'popularity',
      'Newest': 'date',
      'Name': 'alpha',
      'Number of styles': 'style',
      'Trending': 'trending',
    }
    return map[option];
  }
}


class MyDataSource extends DataSource<Font> {
  private pageSize = 20;
  private cachedData: Font[] = [];
  private fetchedPages = new Set<number>();
  private readonly dataStream = new BehaviorSubject<Font[]>(this.cachedData);
  private complete$ = new Subject<void>();
  private disconnect$ = new Subject<void>();
  
  constructor(private fontManager: GoogleFontsManager) {
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
