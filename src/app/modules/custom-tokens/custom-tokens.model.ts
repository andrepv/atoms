import { DBSectionData } from "@core/core-types";
import { StorageToken, StorageGroup, StorageSectionContentManager } from "@core/storages/storages-types";

export type CustomTokensDBToken = StorageToken & {value: string};

export type CustomTokensManager = StorageSectionContentManager<CustomTokensDBToken, StorageGroup>

export const CUSTOM_TOKENS_DB_DATA: DBSectionData = {
  tableGroupName: 'customTokens',
  tokenTableName: 'customTokensToken',
  groupTableName: 'customTokensGroup',
  name: 'Custom Tokens',
}