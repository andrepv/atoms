import { DBSectionData, ITables, TokenGroupModel, TokenModel } from "@core/indexedDB";

export type Variant = "tint" | "shade";
export type ColorVariantField = "tints" | "shades";

export type ColorPaletteTokenValue = {
  color: string,
  isPrimary: boolean,
  tints?: number[], 
  shades?: number[],
  primaryColorId?: number,
  type?: Variant,
};

export type ColorPaletteTokenModel = TokenModel<ColorPaletteTokenValue>;

export type ColorPaletteTokenTable = Dexie.Table<ColorPaletteTokenModel, number>;
export type ColorPaletteGroupTable = Dexie.Table<TokenGroupModel, number>;

export type ColorPaletteTables = ITables<ColorPaletteTokenTable, ColorPaletteGroupTable>

export const COLORPALETTE_DB_DATA: DBSectionData = {
  tableGroupName: 'colorPalette',
  tokenTableName: 'colorPaletteToken',
  groupTableName: 'colorPaletteGroup',
  name: 'Color Palette',
}