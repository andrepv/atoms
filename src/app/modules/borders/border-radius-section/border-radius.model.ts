import { DBSectionData } from "@core/core-types";
import { StorageGroup, StorageSectionContentManager, StorageToken } from "@core/storages/storages-types";

export type BorderRadiusDBToken = StorageToken & {radius: number};

export type BorderRadiusManager = StorageSectionContentManager<BorderRadiusDBToken, StorageGroup>

export const BORDER_RADIUS_DB_DATA: DBSectionData = {
  tableGroupName: 'borderRadius',
  tokenTableName: 'borderRadiusToken',
  groupTableName: 'borderRadiusGroup',
  name: 'Border Radius',
}