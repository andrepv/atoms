import { DBSectionData, DBTables, DBGroup, DBToken } from "@core/core.model";

export type TextStylesTokenValue = {
  styles?: {
    fontFamily?: number,
    fontSize?: number,
    lineHeight?: number,
    letterSpacing?: number,
  },
  text?: string;
};
export type TextStylesTokenModel = DBToken<TextStylesTokenValue>;

export type TextStylesTokenTable = Dexie.Table<TextStylesTokenModel, number>;
export type TextStylesGroupTable = Dexie.Table<DBGroup, number>;

export type TextStylesTables = DBTables<TextStylesTokenTable, TextStylesGroupTable>

export const TEXTSTYLES_DB_DATA: DBSectionData = {
  tableGroupName: 'textStyles',
  tokenTableName: 'textStylesToken',
  groupTableName: 'textStylesGroup',
  name: 'Text Styles',
}