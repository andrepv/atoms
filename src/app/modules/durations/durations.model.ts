import { DBSectionData } from "@core/core-types";
import { StorageToken, StorageGroup, StorageSectionContentManager } from "@core/storages/storages-types";
import { ModularScaleToken, ModularScaleGroup } from "@shared/components/modular-scale-editor/modular-scale-types";

export type DurationsDBToken = StorageToken & ModularScaleToken;
export type DurationsDBGroup = StorageGroup & ModularScaleGroup;

export type DurationsManager = StorageSectionContentManager<DurationsDBToken, DurationsDBGroup>

export const DURATIONS_DB_DATA: DBSectionData = {
  tableGroupName: 'durations',
  tokenTableName: 'durationsToken',
  groupTableName: 'durationsGroup',
  name: 'Durations',
}