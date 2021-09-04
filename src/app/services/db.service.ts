import Dexie from 'dexie';
import { Injectable } from '@angular/core';

export interface ThemeModel {
  id?: number;
  name: string;
}

export type ThemeTable = Dexie.Table<ThemeModel, number>;

@Injectable({providedIn: 'root'})
export class DBService extends Dexie {
  theme: ThemeTable;

  constructor() {
    super('ui-theme-builder-db');
    this.version(1).stores({
      theme: '++id, name',
    });

    this.theme = this.table("theme");
  }
}
