import { DBToken, DBGroup, DBTables, DBSectionData } from "@core/core.model";

export type LineHeightTokenValue = number;
export type LineHeightGroupState = {textPreviewId: number};

export type LineHeightTokenModel = DBToken<LineHeightTokenValue>;
export type LineHeightGroupModel = DBGroup<LineHeightGroupState>;

export type LineHeightTokenTable = Dexie.Table<LineHeightTokenModel, number>;
export type LineHeightGroupTable = Dexie.Table<DBGroup, number>;

export type LineHeightTables = DBTables<LineHeightTokenTable, LineHeightGroupTable>

export const LINEHEIGHT_DB_DATA: DBSectionData = {
  tableGroupName: 'lineHeight',
  tokenTableName: 'lineHeightToken',
  groupTableName: 'lineHeightGroup',
  name: 'Line Height',
}