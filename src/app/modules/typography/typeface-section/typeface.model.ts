import { DBSectionData } from "@core/core-types";
import { StorageGroup, StorageSectionContentManager, StorageToken } from "@core/storages/storages-types";

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
export type TypefaceDBToken = StorageToken & TypefaceTokenValue;

export type TypefaceManager = StorageSectionContentManager<TypefaceDBToken, StorageGroup>

export const TYPEFACE_DB_DATA: DBSectionData = {
  tableGroupName: 'typeface',
  tokenTableName: 'typefaceToken',
  groupTableName: 'typefaceGroup',
  name: 'Type Face',
}