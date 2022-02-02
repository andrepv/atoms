import { DBSectionData } from "@core/core-types";
import { StorageGroup, StorageSectionContentManager, StorageToken } from "@core/storages/storages-types";

export type BorderDBToken = StorageToken & {
  color: string,
  width: number,
  style: "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset" | "none";
};

export type BorderManager = StorageSectionContentManager<BorderDBToken, StorageGroup>

export const BORDER_DB_DATA: DBSectionData = {
  tableGroupName: 'border',
  tokenTableName: 'borderToken',
  groupTableName: 'borderGroup',
  name: 'Borders',
}