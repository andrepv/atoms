import { DBToken, DBGroup, DBTables, DBSectionData } from "@core/core.model";

export type CustomTokensDBToken = DBToken & {value: string};

export type CustomTokensTokenTable = Dexie.Table<CustomTokensDBToken, number>;
export type CustomTokensGroupTable = Dexie.Table<DBGroup, number>;

export type CustomTokensTables = DBTables<CustomTokensTokenTable, CustomTokensGroupTable>

export const CUSTOM_TOKENS_DB_DATA: DBSectionData = {
  tableGroupName: 'customTokens',
  tokenTableName: 'customTokensToken',
  groupTableName: 'customTokensGroup',
  name: 'Custom Tokens',
}