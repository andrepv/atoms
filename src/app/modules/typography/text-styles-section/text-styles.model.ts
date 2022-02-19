import { DBSectionData } from "@core/core-types";
import { StorageGroup, StorageSectionContentManager, StorageToken } from "@core/storages/storages-types";
import { ModularScaleGroup, ModularScaleToken } from "@shared/components/modular-scale-editor/modular-scale-types";

export type TextStylesDBToken = StorageToken & ModularScaleToken & {
  text: string;
  backgroundColor: string,
  color: string,
  typefaceId: number,
  lineHeight: number,
  letterSpacing: number,
  wordSpacing: number,
  fontWeight: string,
  textDecoration: 'underline' | 'line-through' | 'none',
  fontStyle: 'italic' | 'normal';
}

export type TextStylesDBGroup = StorageGroup & ModularScaleGroup & {
  view: 'detailed' | 'default' | 'minimal';
  typefaceId: number;
  text: string;
  backgroundColor: string;
  color: string;
}

export type TextStylesManager = StorageSectionContentManager<TextStylesDBToken, StorageGroup>;

export const TEXTSTYLES_DB_DATA: DBSectionData = {
  tableGroupName: 'textStyles',
  tokenTableName: 'textStylesToken',
  groupTableName: 'textStylesGroup',
  name: 'Text Styles',
}
