import { Component, EventEmitter,OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { FontManagerService } from '../typeface-editor/font-manager.service';
import { TypefaceListGoogleManager } from './typeface-list-google-manager';
import { GoogleFont } from '../typeface-section/typeface.model';
import { MyDataSource } from './data-source';

@Component({
  selector: 'app-typeface-list-google',
  templateUrl: './typeface-list-google.component.html',
  styleUrls: ['./typeface-list-google.component.less'],
})
export class TypefaceListGoogleComponent implements OnInit {
  @Output() save: EventEmitter<GoogleFont> = new EventEmitter();

  categoryOptions = [
    {name: 'sans-serif', value: true},
    {name: 'serif', value: true},
    {name: 'display', value: true},
    {name: 'handwriting', value: true},
    {name: 'monospace', value: true},
  ];

  searchValue = '';

  ds: MyDataSource;

  fontManager: TypefaceListGoogleManager;

  get sortOptions() {
    return this.fontManager.SORT_OPTIONS.map(option => this.getSortOptionName(option));
  }

  private destroy$ = new Subject();
  private searchChange$ = new BehaviorSubject('');

  constructor(fontManager: FontManagerService) {
    this.fontManager = fontManager.googleFonts;
  }

  ngOnInit() {
    this.fontManager.loadFonts();

    this.fontManager.fonts$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
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