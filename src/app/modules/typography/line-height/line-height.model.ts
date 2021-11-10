import { DBSectionData, ITables, TokenGroupModel, TokenModel } from "@core/indexedDB";

export type LineHeightTokenValue = number;
export type LineHeightTokenModel = TokenModel<LineHeightTokenValue>;

export type LineHeightTokenTable = Dexie.Table<LineHeightTokenModel, number>;
export type LineHeightGroupTable = Dexie.Table<TokenGroupModel, number>;

export type LineHeightTables = ITables<LineHeightTokenTable, LineHeightGroupTable>

export const LINEHEIGHT_DB_DATA: DBSectionData = {
  tableGroupName: 'lineHeight',
  tokenTableName: 'lineHeightToken',
  groupTableName: 'lineHeightGroup',
  name: 'Line Height',
}