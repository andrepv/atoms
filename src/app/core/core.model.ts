import { PromiseExtended } from "dexie";

export interface EditableContent<G extends DBGroup = any, T extends DBToken = any> {
  group: StoreGroup<G, T>,
  token?: StoreToken<T>
}

export type SectionNames = "Type Face" | "Type Scale" | "Line Height" | "Letter Spacing" | "Text Styles" | "Spacing" | "Color Palette" | "Box Shadow" | "Border Radius" | "Borders";

export type PageName = "Typography" | "Colors" | "Spacing" | "Shadows" | "Borders";

export interface StoreToken<T extends DBToken = any> {
  name: string;
  id: number;
  value: T['value'];
}

export interface StoreGroup<G extends DBGroup = any, T extends DBToken = any> {
  name: string;
  id: number;
  tokens: StoreToken<T>[];
  anchorLink: string;
  state?: G['state'];
}

export interface DBToken<Value = any> {
  id?: number;
  name: string;
  value: Value;
  groupId: number;
  themeId: number;
}

export interface DBGroup<State = any> {
  id: number;
  name: string;
  themeId: number;
  tokensId: number[];
  state?: State;
}

export interface DBTables<TokenTable, GroupTable> {
  name: SectionNames;
  token: TokenTable;
  group: GroupTable;
  deleteData: (themeId: number) => PromiseExtended<void>;
  isTokenNameUnique: (name: string, themeId: number) => Promise<boolean>;
}

export interface DBSectionData {
  tableGroupName: string;
  tokenTableName: string;
  groupTableName: string;
  name: SectionNames;
}

export interface ThemeModel {
  id?: number;
  name: string
}

export type ThemeTable = Dexie.Table<ThemeModel, number>;

export type TokensByTheme<T extends DBToken> = {
  themeName: string,
  tokens: T[]
}[]