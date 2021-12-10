import { DBToken, DBGroup, DBTables, DBSectionData, StoreToken } from "@core/core.model";

export type Variant = "tint" | "shade";

// export interface ColorPaletteTokenValue {
//   color: string;
//   isPrimary: boolean;
//   primaryColorId?: number;
//   type?: Variant;
// };

export interface ColorPaletteTokenModel extends DBToken {
  color: string;
  isPrimary: boolean;
  primaryColorId?: number;
  type?: Variant;
}

export interface StoreColorPaletteTokenModel extends ColorPaletteTokenModel {
  tint?: ColorPaletteTokenModel[];
  shade?: ColorPaletteTokenModel[];
}

// export type StorePrimaryColor = StoreToken<DBToken<StorePrimaryColorValue>>


export type ColorPaletteTokenTable = Dexie.Table<ColorPaletteTokenModel, number>;
export type ColorPaletteGroupTable = Dexie.Table<DBGroup, number>;

export type ColorPaletteTables = DBTables<ColorPaletteTokenTable, ColorPaletteGroupTable>

export const COLORPALETTE_DB_DATA: DBSectionData = {
  tableGroupName: 'colorPalette',
  tokenTableName: 'colorPaletteToken',
  groupTableName: 'colorPaletteGroup',
  name: 'Color Palette',
}