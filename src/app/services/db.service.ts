import Dexie, { PromiseExtended } from 'dexie';
import { SectionNames } from './store.service';

export interface ThemeModel {
  id?: number;
  name: string;
}

export interface TokenModel<T> {
  id: number;
  name: string;
  value: T;
  groupId: number;
  themeId: number;
}

export interface TokenGroupModel {
  id: number;
  name: string;
  themeId: number;
  tokensId: number[];
}

export type ThemeTable = Dexie.Table<ThemeModel, number>;

export type TypefaceTokenTable = Dexie.Table<TokenModel<string>, number>;
export type TypefaceGroupTable = Dexie.Table<TokenGroupModel, number>;

export type TypescaleTokenTable = Dexie.Table<TokenModel<string>, number>;
export type TypescaleGroupTable = Dexie.Table<TokenGroupModel, number>;

export type Table = Dexie.Table;

export interface ITables<T, G> {
  name: SectionNames;
  token: T;
  group: G;
  deleteData: (themeId: number) => PromiseExtended<void>;
}

export class DBService extends Dexie {
  theme: ThemeTable;
  typeface: ITables<TypefaceTokenTable, TypefaceGroupTable>;
  typescale: ITables<TypescaleTokenTable, TypescaleGroupTable>;

  constructor() {
    super('ui-theme-builder-db');

    const token = "++id, name, themeId";
    const group = "++id, name, themeId, *tokensId";

    this.version(3).stores({
      theme: '++id, name',
      typefaceToken: token,
      typefaceGroup: group,

      typescaleToken: token,
      typescaleGroup: group,
    });

    this.theme = this.table("theme");

    this.typeface = new Tables(
      "Type Face",
      this.table("typefaceToken"),
      this.table("typefaceGroup")
    )

    this.typescale = new Tables(
      "Type Scale",
      this.table("typescaleToken"),
      this.table("typescaleGroup")
    )
  }

  async deleteData(themeId: number) {
    const sections = [this.typeface, this.typescale];
    for (let section of sections) {
      await section.deleteData(themeId)
    }
  }
}

class Tables {
  constructor(
    public name: SectionNames,
    public token: TypefaceTokenTable,
    public group: TypefaceGroupTable
  ) {}

  deleteData(themeId: number) {
    return db.transaction('rw', [this.token, this.group], async () => {
      const groups = await this.group.where("themeId").equals(themeId).toArray();

      for (let group of groups) {
        for (let tokenId of group.tokensId) {
          await this.token.delete(tokenId);
        }
        await this.group.delete(group.id);
      }
    })
  }
}

const db = new DBService();
export {db};