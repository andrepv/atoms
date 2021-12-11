import { DBToken, DBGroup, DBTables, DBSectionData } from "@core/core.model";

export type TypescaleDBToken = DBToken & {value: number};
export type TypescaleDBGroup = DBGroup & {
  textPreviewId: number;
  scale: {base: number, scaleRatio: number} | false;
};

export type TypescaleTokenTable = Dexie.Table<TypescaleDBToken, number>;
export type TypescaleGroupTable = Dexie.Table<TypescaleDBGroup, number>;

export type TypescaleTables = DBTables<TypescaleTokenTable, TypescaleGroupTable>

export const TYPESCALE_DB_DATA: DBSectionData = {
  tableGroupName: 'typescale',
  tokenTableName: 'typescaleToken',
  groupTableName: 'typescaleGroup',
  name: 'Type Scale',
}