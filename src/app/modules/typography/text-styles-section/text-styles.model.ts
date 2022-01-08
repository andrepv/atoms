import { DBSectionData, DBTables, DBGroup, DBToken } from "@core/core.model";
import { ModularScaleGroup, ModularScaleToken } from "@shared/components/modular-scale-editor/modular-scale-types";

export type TextStylesDBToken = DBToken & ModularScaleToken & {
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

export type TextStylesDBGroup = DBGroup & ModularScaleGroup

export type TextStylesTokenTable = Dexie.Table<TextStylesDBToken, number>;
export type TextStylesGroupTable = Dexie.Table<TextStylesDBGroup, number>;

export type TextStylesTables = DBTables<TextStylesTokenTable, TextStylesGroupTable>

export const TEXTSTYLES_DB_DATA: DBSectionData = {
  tableGroupName: 'textStyles',
  tokenTableName: 'textStylesToken',
  groupTableName: 'textStylesGroup',
  name: 'Text Styles',
}