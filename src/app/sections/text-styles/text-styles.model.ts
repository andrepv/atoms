import { DBSectionData, ITables, TokenGroupModel, TokenModel } from "../../services/db.service";

export type TextStylesTokenValue = {
  styles?: {
    fontFamily?: number,
    fontSize?: number,
    lineHeight?: number,
    letterSpacing?: number,
  },
  text?: string;
};
export type TextStylesTokenModel = TokenModel<TextStylesTokenValue>;

export type TextStylesTokenTable = Dexie.Table<TextStylesTokenModel, number>;
export type TextStylesGroupTable = Dexie.Table<TokenGroupModel, number>;

export type TextStylesTables = ITables<TextStylesTokenTable, TextStylesGroupTable>

export const TEXTSTYLES_DB_DATA: DBSectionData = {
  tableGroupName: 'textStyles',
  tokenTableName: 'textStylesToken',
  groupTableName: 'textStylesGroup',
  name: 'Text Styles',
}