import { DBToken, DBGroup, DBTables, DBSectionData } from "@core/core.model";

export type Variant = "tint" | "shade";
export type ColorVariantField = "tints" | "shades";

export interface ColorPaletteTokenValue {
  color: string;
  isPrimary: boolean;
  tints?: number[];
  shades?: number[];
  primaryColorId?: number;
  type?: Variant;
};

export type ColorPaletteTokenModel = DBToken<ColorPaletteTokenValue>;

export type ColorPaletteTokenTable = Dexie.Table<ColorPaletteTokenModel, number>;
export type ColorPaletteGroupTable = Dexie.Table<DBGroup, number>;

export type ColorPaletteTables = DBTables<ColorPaletteTokenTable, ColorPaletteGroupTable>

export const COLORPALETTE_DB_DATA: DBSectionData = {
  tableGroupName: 'colorPalette',
  tokenTableName: 'colorPaletteToken',
  groupTableName: 'colorPaletteGroup',
  name: 'Color Palette',
}