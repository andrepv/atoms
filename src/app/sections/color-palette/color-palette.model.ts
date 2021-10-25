import { DBSectionData, ITables, TokenGroupModel, TokenModel } from "../../services/db.service";

export type ColorPaletteTokenValue = {
  color: string,
  tints?: number[], 
  shades?: number[],
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