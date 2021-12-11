import { DBToken, DBGroup, DBTables, DBSectionData } from "@core/core.model";
import { ModularScaleState } from "@shared/components/modular-scale-editor/modular-scale-editor.model";

export type DurationsDBToken = DBToken & {value: number};
export type DurationsDBGroup = DBGroup & {scale: Pick<ModularScaleState, 'scaleRatio' | 'base'> | false};

export type DurationsTokenTable = Dexie.Table<DurationsDBToken, number>;
export type DurationsGroupTable = Dexie.Table<DurationsDBGroup, number>;

export type DurationsTables = DBTables<DurationsTokenTable, DurationsGroupTable>

export const DURATIONS_DB_DATA: DBSectionData = {
  tableGroupName: 'durations',
  tokenTableName: 'durationsToken',
  groupTableName: 'durationsGroup',
  name: 'Durations',
}