import { DBToken, DBGroup, DBTables, DBSectionData } from "@core/core.model";
import { ModularScaleToken, ModularScaleGroup } from "@shared/components/modular-scale-editor/modular-scale-types";

export type DurationsDBToken = DBToken & ModularScaleToken;
export type DurationsDBGroup = DBGroup & ModularScaleGroup;

export type DurationsTokenTable = Dexie.Table<DurationsDBToken, number>;
export type DurationsGroupTable = Dexie.Table<DurationsDBGroup, number>;

export type DurationsTables = DBTables<DurationsTokenTable, DurationsGroupTable>

export const DURATIONS_DB_DATA: DBSectionData = {
  tableGroupName: 'durations',
  tokenTableName: 'durationsToken',
  groupTableName: 'durationsGroup',
  name: 'Durations',
}