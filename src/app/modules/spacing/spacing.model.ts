import { DBSectionData } from "@core/core-types";
import { StorageToken, StorageGroup, StorageSectionContentManager } from "@core/storages/storages-types";
import { ModularScaleGroup, ModularScaleToken } from "@shared/components/modular-scale-editor/modular-scale-types";

export type SpacingDBToken = StorageToken & ModularScaleToken;
export type SpacingDBGroup = StorageGroup & ModularScaleGroup;

export type SpacingManager = StorageSectionContentManager<SpacingDBToken, SpacingDBGroup>

export const SPACING_DB_DATA: DBSectionData = {
  tableGroupName: 'spacing',
  tokenTableName: 'spacingToken',
  groupTableName: 'spacingGroup',
  name: 'Spacing',
}