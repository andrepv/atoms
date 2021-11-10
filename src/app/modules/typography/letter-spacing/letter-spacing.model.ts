import { DBSectionData, ITables, TokenGroupModel, TokenModel } from "@core/indexedDB";

export type LetterSpacingTokenValue = number;
export type LetterSpacingTokenModel = TokenModel<LetterSpacingTokenValue>;

export type LetterSpacingTokenTable = Dexie.Table<LetterSpacingTokenModel, number>;
export type LetterSpacingGroupTable = Dexie.Table<TokenGroupModel, number>;

export type LetterSpacingTables = ITables<LetterSpacingTokenTable, LetterSpacingGroupTable>

export const LETTERSPACING_DB_DATA: DBSectionData = {
  tableGroupName: 'letterSpacing',
  tokenTableName: 'letterSpacingToken',
  groupTableName: 'letterSpacingGroup',
  name: 'Letter Spacing',
}