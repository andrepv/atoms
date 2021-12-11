import { DBToken, DBGroup, DBTables, DBSectionData, StoreToken } from "@core/core.model";

export type Variant = "tint" | "shade";

export type VariantConfig = {
  mixRatio: number;
  saturation: number;
}

export type ColorPaletteDBToken = DBToken & {
  color: string;
  isPrimary: boolean;
  primaryColorId?: number;
  type?: Variant;
  tintConfigs: VariantConfig;
  shadeConfigs: VariantConfig;
};

export type ColorPaletteStoreToken = StoreToken<ColorPaletteDBToken> & {
  tint?: ColorPaletteDBToken[];
  shade?: ColorPaletteDBToken[];
}

export type ColorPaletteTokenTable = Dexie.Table<ColorPaletteDBToken, number>;
export type ColorPaletteGroupTable = Dexie.Table<DBGroup, number>;

export type ColorPaletteTables = DBTables<ColorPaletteTokenTable, ColorPaletteGroupTable>

export const COLORPALETTE_DB_DATA: DBSectionData = {
  tableGroupName: 'colorPalette',
  tokenTableName: 'colorPaletteToken',
  groupTableName: 'colorPaletteGroup',
  name: 'Color Palette',
}