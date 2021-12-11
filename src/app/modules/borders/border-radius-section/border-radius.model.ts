import { DBToken, DBGroup, DBTables, DBSectionData } from "@core/core.model";

export type BorderRadiusDBToken = DBToken & {radius: number};

export type BorderRadiusTokenTable = Dexie.Table<BorderRadiusDBToken, number>;
export type BorderRadiusGroupTable = Dexie.Table<DBGroup, number>;

export type BorderRadiusTables = DBTables<BorderRadiusTokenTable, BorderRadiusGroupTable>

export const BORDER_RADIUS_DB_DATA: DBSectionData = {
  tableGroupName: 'borderRadius',
  tokenTableName: 'borderRadiusToken',
  groupTableName: 'borderRadiusGroup',
  name: 'Border Radius',
}