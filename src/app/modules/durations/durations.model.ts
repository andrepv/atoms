import { DBToken, DBGroup, DBTables, DBSectionData } from "@core/core.model";
import { ModularScaleState } from "@shared/components/modular-scale-editor/modular-scale-editor.model";

export type DurationsTokenValue = number;
export type DurationsGroupState = {scale: Pick<ModularScaleState, 'scaleRatio' | 'base'> | false};

export type DurationsTokenModel = DBToken<DurationsTokenValue>;
export type DurationsGroupModel = DBGroup<DurationsGroupState>;

export type DurationsTokenTable = Dexie.Table<DurationsTokenModel, number>;
export type DurationsGroupTable = Dexie.Table<DurationsGroupModel, number>;

export type DurationsTables = DBTables<DurationsTokenTable, DurationsGroupTable>

export const DURATIONS_DB_DATA: DBSectionData = {
  tableGroupName: 'durations',
  tokenTableName: 'durationsToken',
  groupTableName: 'durationsGroup',
  name: 'Durations',
}