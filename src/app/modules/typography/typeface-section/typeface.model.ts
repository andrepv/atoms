import { DBToken, DBGroup, DBTables, DBSectionData } from "@core/core.model";

export type FontType = 'google-fonts' | 'custom-font';
export type FontCategory = "sans-serif" | "serif" | "display" | "handwriting" | "monospace";

export interface FontModel {family: string, type: FontType}

export interface CustomFont extends FontModel {
  data: string | ArrayBuffer
}

export interface GoogleFont extends FontModel {
	variants: string[];
	subsets: string[];
	category: FontCategory;
}

export type TypefaceTokenValue = CustomFont | GoogleFont;
export type TypefaceTokenModel = DBToken<TypefaceTokenValue>;

export type TypefaceTokenTable = Dexie.Table<TypefaceTokenModel, number>;
export type TypefaceGroupTable = Dexie.Table<DBGroup, number>;

export type TypefaceTables = DBTables<TypefaceTokenTable, TypefaceGroupTable>

export const TYPEFACE_DB_DATA: DBSectionData = {
  tableGroupName: 'typeface',
  tokenTableName: 'typefaceToken',
  groupTableName: 'typefaceGroup',
  name: 'Type Face',
}