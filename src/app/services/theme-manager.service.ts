import { Injectable } from '@angular/core';
import { BehaviorSubject, from, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, switchMap, tap } from 'rxjs/operators';
import { db, ThemeModel, ThemeTable } from './db.service';

@Injectable({providedIn: 'root'})
export class ThemeManagerService {
  table: ThemeTable;
  isLoading = false;
  
  private _selected: ThemeModel = null;
  selected$ = new Subject<ThemeModel>();
  
  set selected(theme: ThemeModel) {
    this._selected = theme;
    this.selected$.next(theme);
  }
  
  get selected() {
    return this._selected;
  }

  private _list: ThemeModel[] = [];

  set list(themeList: ThemeModel[]) {
    this._list = themeList;
  }
  
  get list() {
    return this._list;
  }

  private searchChange$ = new BehaviorSubject('');
  private isSearching = false;
  private canSearch = false;

  private readonly PAGE_SIZE = 20;
  private totalCount = 0;
  private currentPage = 1;
  private get hasMorePages() {
    return this.currentPage * this.PAGE_SIZE < this.totalCount;
  }

  private readonly DEFAULT_THEME_NAME = "new theme";

  constructor() {
    this.table = db.theme;

    this.searchChange$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(value => this.isSearching = Boolean(value)),
      switchMap(themeName => this.getSearchResults(themeName))
    ).subscribe();
  }

  async loadList(limit = this.PAGE_SIZE) {
    this.list = await this.load({limit});
    this.totalCount = await this.table.count();
    this.selected = this.list[0]; // tmp
  }

  search(themeName: string) {
    if (!this.canSearch) {
      this.canSearch = true;
    }

    this.searchChange$.next(themeName);
  }

  async loadMore() {
    if (this.hasMorePages && !this.isSearching) {
      this.currentPage += 1;
      const offset = (this.currentPage - 1) * this.PAGE_SIZE;

      const list = await this.load({offset});
      this.list = [...this.list, ...list];
    }
  }

  async load({offset = 0, limit = this.PAGE_SIZE} = {}) {
    const query = this.getCollection().offset(offset).limit(limit)
    let themes = await query.toArray();
  
    if (!themes.length) {
      const newTheme = await this.addToDB();
      themes = [newTheme];
    }
    return themes;
  }
  
  async add(name = this.DEFAULT_THEME_NAME) {
    const theme = await this.addToDB(name);
    this.list = [theme, ...this.list];
    this.selected = theme;
  }

  async rename(name: string) {
    const { id } = this.selected;
    await this.table.update(id, {name});

    const nextTheme = {id, name};
    const nextList = this.list.map(prevTheme => (
      prevTheme.id === id ? nextTheme : prevTheme
    ))

    this.list = nextList;
    this.updateSelected();
  }

  async delete(id: number) {
    await this.table.delete(id);
  
    const themeIndex = this.list.findIndex(theme => theme.id === id);
    const nextTheme = this.list[themeIndex + 1];
    const prevTheme = this.list[themeIndex - 1];

    let nextThemeList = this.list.filter(theme => theme.id !== id);
    let nextSelectedTheme = null;

    if (nextTheme) {
      nextSelectedTheme = nextTheme;
    } else if (prevTheme) {
      nextSelectedTheme = prevTheme;
    }

    if (!nextSelectedTheme) {
      const theme = await this.addToDB();
      nextThemeList = [theme];
      nextSelectedTheme = theme;
    }

    this.list = nextThemeList;
    this.selected = nextSelectedTheme;
  }

  getSearchResults(value: string) {
    if (!this.canSearch) {
      return of();
    }

    const limit = !this.isSearching 
      ? this.PAGE_SIZE * this.currentPage
      : this.PAGE_SIZE;

    this.isLoading = true;

    const collection = this.getCollection().filter(theme => (
      new RegExp(value, 'i').test(theme.name)
    )).limit(limit);

    return from(collection.toArray()).pipe(
      tap(list => {
        this.list = list;
        this.updateSelected();
      }),
      finalize(() => this.isLoading = false)
    )
  }

  private async addToDB(name = this.DEFAULT_THEME_NAME) {
    const id = await this.table.add({name});
    return {id, name} as ThemeModel;
  }

  private getCollection() {
    return this.table.orderBy('id').reverse();
  }

  // without updating the selected theme, nz-select won't be able to mark an object of a new list as active
  private updateSelected() {
    this.list.map(theme => {
      if (theme.id === this.selected.id) {
        this.selected = theme;
      }
    })
  }
}