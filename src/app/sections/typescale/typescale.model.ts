import { DBSectionData, ITables, TokenGroupModel, TokenModel } from "../../services/db.service";

export type TypescaleTokenValue = number;
export type TypescaleGroupState = {
  textPreviewId: number;
  scale: {base: number, scaleRatio: number} | false;
};

export type TypescaleTokenModel = TokenModel<TypescaleTokenValue>;
export type TypescaleGroupModel = TokenGroupModel<number>;

export type TypescaleTokenTable = Dexie.Table<TypescaleTokenModel, number>;
export type TypescaleGroupTable = Dexie.Table<TypescaleGroupModel, number>;

export type TypescaleTables = ITables<TypescaleTokenTable, TypescaleGroupTable>

export const TYPESCALE_DB_DATA: DBSectionData = {
  tableGroupName: 'typescale',
  tokenTableName: 'typescaleToken',
  groupTableName: 'typescaleGroup',
  name: 'Type Scale',
}