import { DBToken, DBGroup, DBTables, DBSectionData } from "@core/core.model";

export type BorderDBToken = DBToken & {
  color: string,
  width: number,
  style: "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset" | "none";
};

export type BorderTokenTable = Dexie.Table<BorderDBToken, number>;
export type BorderGroupTable = Dexie.Table<DBGroup, number>;

export type BorderTables = DBTables<BorderTokenTable, BorderGroupTable>

export const BORDER_DB_DATA: DBSectionData = {
  tableGroupName: 'border',
  tokenTableName: 'borderToken',
  groupTableName: 'borderGroup',
  name: 'Borders',
}