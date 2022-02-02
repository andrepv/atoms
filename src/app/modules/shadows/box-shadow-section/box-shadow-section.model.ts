import { DBSectionData } from "@core/core-types";
import { StorageToken, StorageGroup, StorageSectionContentManager } from "@core/storages/storages-types";

export interface BoxShadowLayer {
  inset: 'inset' | '';
  offsetX: string;
  offsetY: string;
  blur: string;
  spread: string;
  color: string;
}

export type BoxShadowDBToken = StorageToken & {
  blockColor: string;
  backgroundColor: string;
  layers: BoxShadowLayer[];
};

export type BoxShadowManager = StorageSectionContentManager<BoxShadowDBToken, StorageGroup>

export const BOX_SHADOW_DB_DATA: DBSectionData = {
  tableGroupName: 'boxShadow',
  tokenTableName: 'boxShadowToken',
  groupTableName: 'boxShadowGroup',
  name: 'Box Shadow',
}