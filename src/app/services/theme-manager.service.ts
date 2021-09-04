import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, switchMap, tap } from 'rxjs/operators';
import { DBService, ThemeModel, ThemeTable } from './db.service';

@Injectable({providedIn: 'root'})
export class ThemeManagerService {
  table: ThemeTable;
  isLoading = false;
  
  private _active: ThemeModel = null;
  
  set active(theme: ThemeModel) {
    this._active = theme;
  }
  
  get active() {
    return this._active;
  }

  private _list: ThemeModel[] = [];

  set list(themeList: ThemeModel[]) {
    this._list = themeList;
  }
  
  get list() {
    return this._list;
  }

  private searchChange$ = new BehaviorSubject('');

  private get isSearching() {
    return Boolean(this.searchChange$.getValue());
  }

  private readonly PAGE_SIZE = 8;
  private totalCount = 0;
  private currentPage = 1;
  private get hasMorePages() {
    return this.currentPage * this.PAGE_SIZE < this.totalCount;
  }

  private readonly DEFAULT_THEME_NAME = "new theme";

  constructor(private db: DBService) {
    this.table = db.theme;

    this.searchChange$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(themeName => this.getSearchResults(themeName))
    ).subscribe();
  }

  async loadList(limit = this.PAGE_SIZE) {
    this.list = await this.load({limit});
    this.totalCount = await this.table.count();
    this.active = this.list[0]; // tmp
  }

  search(themeName: string) {
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
    const collection = this.table.orderBy('id').reverse();
    const query = collection.offset(offset).limit(limit)
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
    this.active = theme;
  }
  
  async rename(name: string) {
    const { id } = this.active;
    await this.table.update(id, {name});

    const nextTheme = {id, name};
    const nextList = this.list.map(prevTheme => (
      prevTheme.id === id ? nextTheme : prevTheme
    ))

    this.active = nextTheme;
    this.list = nextList;
  }

  private getSearchResults(value: string) {
    console.log('getSearchResults')
    const limit = !this.isSearching 
      ? this.PAGE_SIZE * this.currentPage
      : this.PAGE_SIZE;

    this.isLoading = true;

    const collection = this.table.orderBy('id').reverse().filter(theme => (
      new RegExp(value, 'i').test(theme.name)
    )).limit(limit);

    return from(collection.toArray()).pipe(
      tap(list => {
        this.list = list;
        this.list.map(theme => {
          if (theme.id === this.active.id) {
            this.active = theme;
          }
        })
      }),
      finalize(() => this.isLoading = false)
    )
  }

  private async addToDB(name = this.DEFAULT_THEME_NAME) {
    const id = await this.table.add({name});
    return {id, name} as ThemeModel;
  }

  async delete(id: number) {
    await this.table.delete(id);
  
    const themeIndex = this.list.findIndex(theme => theme.id === id);
    const nextTheme = this.list[themeIndex + 1];
    const prevTheme = this.list[themeIndex - 1];

    let nextThemeList = this.list.filter(theme => theme.id !== id);
    let nextActiveTheme = null;

    if (nextTheme) {
      nextActiveTheme = nextTheme;
    } else if (prevTheme) {
      nextActiveTheme = prevTheme;
    }

    if (!nextActiveTheme) {
      const theme = await this.addToDB();
      nextThemeList = [theme];
      nextActiveTheme = theme;
    }

    this.list = nextThemeList;
    this.active = nextActiveTheme;
  }
}
