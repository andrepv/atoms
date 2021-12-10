
export type SectionNames = "Type Face" | "Type Scale" | "Line Height" | "Letter Spacing" | "Text Styles" | "Spacing" | "Color Palette" | "Box Shadow" | "Border Radius" | "Borders" | "Durations";

export type PageName = "Typography" | "Colors" | "Spacing" | "Shadows" | "Borders" | "Durations";

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
  state?: State;
}

export interface StoreToken<T extends DBToken = any> extends DBToken<T['value']> {
    name: string;
  id: number;
  value: T['value'];
}

// export interface StoreToken extends Pick<DBToken, 'name' | 'id'> {}

// export interface StoreGroup<T extends StoreToken = StoreToken> extends Pick<DBGroup, 'name' | 'id'> {
//   tokens: T[];
//   anchorLink: string;
// }


export interface EditableContent<G extends DBGroup = any, T extends DBToken = any> {
  token?: T,
  group: G,
}

export interface StoreGroup<G extends DBGroup = any, T extends DBToken = any> {
  name: string;
  id: number;
  tokens: StoreToken<T>[];
  anchorLink: string;
  state?: G['state'];
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