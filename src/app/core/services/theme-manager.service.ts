import { Injectable } from '@angular/core';
import { ThemeModel, ThemeTable } from '@core/core.model';
import { BehaviorSubject, from, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, switchMap, tap } from 'rxjs/operators';
import { db } from '../indexedDB';

@Injectable({providedIn: 'root'})
export class ThemeManagerService {
  table: ThemeTable;
  isLoading = false;
  
  selected$ = new Subject<ThemeModel>();
  
  set selected(theme: ThemeModel) {
    this._selected = theme;
  }

  get selected() {
    return this._selected;
  }

  set list(themeList: ThemeModel[]) {
    this._list = themeList;
  }
  
  get list() {
    return this._list;
  }
  
  private _selected: ThemeModel = null;
  private _list: ThemeModel[] = [];
  private searchChange$ = new BehaviorSubject('');
  private isSearching = false;
  private canSearch = false;

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

  async loadList() {
    this.list = await this.getCollection().toArray();

    if (this.list.length) {
      const theme = await this.getSelectedTheme();
      this.selectTheme(theme)
      this.updateSelected();
    }
  }

  selectTheme(theme: ThemeModel) {
    this.selected = theme;
    this.selected$.next(this.selected);

    localStorage.setItem('selectedThemeId', `${theme.id}`);
  }

  search(themeName: string) {
    if (!this.canSearch) {
      this.canSearch = true;
    }

    this.searchChange$.next(themeName);
  }


  async add(name = this.DEFAULT_THEME_NAME) {
    const theme = await this.addToDB(name);
    this.list = [theme, ...this.list];
    this.selectTheme(theme)
    return theme;
  }

  async rename(name: string) {
    const { id } = this.selected;
    await this.table.update(id, {name});

    this.list = this.list.map(prevTheme => (
      prevTheme.id === id ? {id, name} : prevTheme
    ));
    this.updateSelected();
  }

  async delete(id: number) {
    await db.deleteData(id);
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
    this.selectTheme(nextSelectedTheme)
  }

  getSearchResults(value: string) {
    if (!this.canSearch) {
      return of();
    }
    this.isLoading = true;

    const collection = this.getCollection().filter(theme => (
      new RegExp(value, 'i').test(theme.name)
    ));

    return from(collection.toArray()).pipe(
      tap(list => {
        this.list = list;
        this.updateSelected();
      }),
      finalize(() => this.isLoading = false)
    )
  }

  private async getSelectedTheme() {
    let themeId = localStorage.getItem('selectedThemeId');

    if (!themeId) {
      let theme = this.list[0];
      if (theme) {
        localStorage.setItem('selectedThemeId', `${theme.id}`)
        return theme;
      }
    }

    const theme = await this.table.get(parseInt(themeId));
    if (theme) return theme
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