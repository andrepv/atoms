import Dexie, { PromiseExtended } from 'dexie';
import { CustomFont } from '../editors/typeface-editor/custom-fonts/custom-font.component';
import { GoogleFont } from '../editors/typeface-editor/google-fonts/google-fonts.component';
import { SectionNames } from './store.service';

export interface ThemeModel {
  id?: number;
  name: string;
}

export interface TokenModel<T = any> {
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
  state?: any;
}

export type ThemeTable = Dexie.Table<ThemeModel, number>;

export type TypefaceTokenTable = Dexie.Table<TokenModel<CustomFont | GoogleFont>, number>;
export type TypefaceGroupTable = Dexie.Table<TokenGroupModel, number>;

export type TypescaleTokenTable = Dexie.Table<TokenModel<number>, number>;
export type TypescaleGroupTable = Dexie.Table<TokenGroupModel, number>;

export type LineHeightTokenTable = Dexie.Table<TokenModel<number>, number>;
export type LineHeightGroupTable = Dexie.Table<TokenGroupModel, number>;

export type Table = Dexie.Table;

export interface ITables<T, G> {
  name: SectionNames;
  token: T;
  group: G;
  deleteData: (themeId: number) => PromiseExtended<void>;
  isTokenNameUnique: (name: string, themeId: number) => Promise<boolean>;
}

export class DBService extends Dexie {
  theme: ThemeTable;
  typeface: ITables<TypefaceTokenTable, TypefaceGroupTable>;
  typescale: ITables<TypescaleTokenTable, TypescaleGroupTable>;
  lineHeight: ITables<LineHeightTokenTable, LineHeightGroupTable>;

  get sections() {
    return [this.typeface, this.typescale];
  }

  constructor() {
    super('ui-theme-builder-db');

    const token = "++id, name, themeId";
    const group = "++id, name, themeId, *tokensId";

    this.version(4).stores({
      theme: '++id, name',
      typefaceToken: token,
      typefaceGroup: group,

      typescaleToken: token,
      typescaleGroup: group,

      lineHeightToken: token,
      lineHeightGroup: group,
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

    this.lineHeight = new Tables(
      "Line Height",
      this.table("lineHeightToken"),
      this.table("lineHeightGroup")
    )
  }

  async deleteData(themeId: number) {
    for (let section of this.sections) {
      await section.deleteData(themeId)
    }
  }
}

class Tables<T extends Table, G extends Table> {
  constructor(
    public name: SectionNames,
    public token: T,
    public group: G,
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

  async isTokenNameUnique(name: string, themeId: number) {
    const res = await this.token
    .where("name").equalsIgnoreCase(name)
    .and(token => token.themeId === themeId).toArray();
    return !Boolean(res.length);
  }
}

const db = new DBService();
export {db};