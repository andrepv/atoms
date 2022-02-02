import { StorageEntityManager, StorageToken, StorageGroup } from "./storages/storages-types";

export type SectionNames = "Type Face" | "Text Styles" | "Spacing" | "Color Palette" | "Box Shadow" | "Border Radius" | "Borders" | "Durations" | "Custom Tokens";

export type PageName = "Typography" | "Colors" | "Spacing" | "Shadows" | "Borders" | "Durations" | "Custom Tokens";

export type StorageTokenValue<T extends StorageToken> = Omit<T, keyof StorageToken>

export type StorageGroupValue<G extends StorageGroup> = Omit<G, keyof StorageGroup>

export type StoreToken<T extends StorageToken = any> = {
  [K in keyof T]: T[K]
}

export type StoreGroup<G extends StorageGroup = any, T extends StorageToken = any> = {
  [K in keyof G]: G[K] 
} & {
  tokens: StoreToken<T>[];
}

export interface EditableContent<T extends StorageToken = any, G extends StorageGroup = any> {
  token?: StoreToken<T>,
  group: StoreGroup<G, T>,
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

export type ThemeTable = StorageEntityManager<ThemeModel>;

export type TokensByTheme<T extends StorageToken> = {
  themeName: string,
  tokens: T[]
}[]

export type SectionViewOption<T extends string> = {
  name: T,
}