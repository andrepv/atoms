import { DBToken, DBGroup, DBTables, DBSectionData } from "@core/core.model";

export type LineHeightDBToken = DBToken & {value: number};
export type LineHeightDBGroup = DBGroup & {textPreviewId: number};

export type LineHeightTokenTable = Dexie.Table<LineHeightDBToken, number>;
export type LineHeightGroupTable = Dexie.Table<LineHeightDBGroup, number>;

export type LineHeightTables = DBTables<LineHeightTokenTable, LineHeightGroupTable>

export const LINEHEIGHT_DB_DATA: DBSectionData = {
  tableGroupName: 'lineHeight',
  tokenTableName: 'lineHeightToken',
  groupTableName: 'lineHeightGroup',
  name: 'Line Height',
}