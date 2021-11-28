import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Font } from '../typeface-editor/font-manager.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { TypefaceListGoogleManager } from './typeface-list-google-manager';

export class MyDataSource extends DataSource<Font> {
  private pageSize = 20;
  private cachedData: Font[] = [];
  private fetchedPages = new Set<number>();
  private readonly dataStream = new BehaviorSubject<Font[]>(this.cachedData);
  private complete$ = new Subject<void>();
  private disconnect$ = new Subject<void>();
  
  constructor(private fontManager: TypefaceListGoogleManager) {
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