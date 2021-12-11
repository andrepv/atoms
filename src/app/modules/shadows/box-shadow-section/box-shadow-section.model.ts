import { DBToken, DBGroup, DBTables, DBSectionData } from "@core/core.model";

export interface BoxShadowLayer {
  inset: 'inset' | '';
  offsetX: string;
  offsetY: string;
  blur: string;
  spread: string;
  color: string;
}

export type BoxShadowDBToken = DBToken & {
  blockColor: string;
  backgroundColor: string;
  layers: BoxShadowLayer[];
};

export type BoxShadowTokenTable = Dexie.Table<BoxShadowDBToken, number>;
export type BoxShadowGroupTable = Dexie.Table<DBGroup, number>;

export type BoxShadowTables = DBTables<BoxShadowTokenTable, BoxShadowGroupTable>

export const BOX_SHADOW_DB_DATA: DBSectionData = {
  tableGroupName: 'boxShadow',
  tokenTableName: 'boxShadowToken',
  groupTableName: 'boxShadowGroup',
  name: 'Box Shadow',
}