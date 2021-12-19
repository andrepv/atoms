export type SectionNames = "Type Face" | "Type Scale" | "Line Height" | "Letter Spacing" | "Text Styles" | "Spacing" | "Color Palette" | "Box Shadow" | "Border Radius" | "Borders" | "Durations" | "Custom Tokens";

export type PageName = "Typography" | "Colors" | "Spacing" | "Shadows" | "Borders" | "Durations" | "Custom Tokens";

export interface DBToken {
  id?: number;
  name: string;
  groupId: number;
  themeId: number;
}

export interface DBGroup {
  id: number;
  name: string;
  themeId: number;
}

export type SectionTokenValue<T extends DBToken> = Omit<T, keyof DBToken>
export type SectionGroupValue<G extends DBGroup> = Omit<G, keyof DBGroup>

export type StoreToken<T extends DBToken = any> = {
  [K in keyof T]: T[K]
}

export type StoreGroup<G extends DBGroup = any, T extends DBToken = any> = {
  [K in keyof G]: G[K] 
} & {
  tokens: StoreToken<T>[];
}

export interface EditableContent<T extends DBToken = any, G extends DBGroup = any> {
  token?: StoreToken<T>,
  group: StoreGroup<G, T>,
}

export interface DBTables<TokenTable, GroupTable> {
  name: SectionNames;
  tokenTable: TokenTable;
  groupTable: GroupTable;
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