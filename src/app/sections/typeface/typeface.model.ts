import { DBSectionData, ITables, TokenGroupModel, TokenModel } from "../../services/db.service";

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
export type TypefaceTokenModel = TokenModel<TypefaceTokenValue>;

export type TypefaceTokenTable = Dexie.Table<TypefaceTokenModel, number>;
export type TypefaceGroupTable = Dexie.Table<TokenGroupModel, number>;

export type TypefaceTables = ITables<TypefaceTokenTable, TypefaceGroupTable>

export const TYPEFACE_DB_DATA: DBSectionData = {
  tableGroupName: 'typeface',
  tokenTableName: 'typefaceToken',
  groupTableName: 'typefaceGroup',
  name: 'Type Face',
}