import { DBToken, DBGroup, DBTables, DBSectionData } from "@core/core.model";

export type TypescaleTokenValue = number;
export type TypescaleGroupState = {
  textPreviewId: number;
  scale: {base: number, scaleRatio: number} | false;
};

export type TypescaleTokenModel = DBToken<TypescaleTokenValue>;
export type TypescaleGroupModel = DBGroup<TypescaleGroupState>;

export type TypescaleTokenTable = Dexie.Table<TypescaleTokenModel, number>;
export type TypescaleGroupTable = Dexie.Table<TypescaleGroupModel, number>;

export type TypescaleTables = DBTables<TypescaleTokenTable, TypescaleGroupTable>

export const TYPESCALE_DB_DATA: DBSectionData = {
  tableGroupName: 'typescale',
  tokenTableName: 'typescaleToken',
  groupTableName: 'typescaleGroup',
  name: 'Type Scale',
}