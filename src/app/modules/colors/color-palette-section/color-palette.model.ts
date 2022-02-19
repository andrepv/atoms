import { DBSectionData, CacheToken } from "@core/core-types";
import { StorageGroup, StorageSectionContentManager, StorageToken } from "@core/storages/storages-types";

export type Variant = "tint" | "shade";

export type VariantConfig = {
  mixRatio: number;
  saturation: number;
}

export type ColorPaletteDBToken = StorageToken & {
  color: string;
  isPrimary: boolean;
  primaryColorId?: number;
  type?: Variant;
  tintConfigs: VariantConfig;
  shadeConfigs: VariantConfig;
  autoUpdate?: boolean;
};

export type ColorPaletteDBGroup = StorageGroup & {
  view: 'grouped' | 'default' | 'inline';
}

export type ColorPaletteCacheToken = CacheToken<ColorPaletteDBToken> & {
  tint?: ColorPaletteDBToken[];
  shade?: ColorPaletteDBToken[];
}

export type ColorPaletteManager = StorageSectionContentManager<ColorPaletteDBToken, StorageGroup>

export const COLORPALETTE_DB_DATA: DBSectionData = {
  tableGroupName: 'colorPalette',
  tokenTableName: 'colorPaletteToken',
  groupTableName: 'colorPaletteGroup',
  name: 'Color Palette',
}