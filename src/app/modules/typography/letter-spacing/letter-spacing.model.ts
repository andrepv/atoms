import { DBToken, DBGroup, DBTables, DBSectionData } from "@core/core.model";

export type LetterSpacingTokenValue = number;
export type LetterSpacingGroupState = {textPreviewId: number};

export type LetterSpacingTokenModel = DBToken<LetterSpacingTokenValue>;
export type LetterSpacingGroupModel = DBGroup<LetterSpacingGroupState>;

export type LetterSpacingTokenTable = Dexie.Table<LetterSpacingTokenModel, number>;
export type LetterSpacingGroupTable = Dexie.Table<DBGroup, number>;

export type LetterSpacingTables = DBTables<LetterSpacingTokenTable, LetterSpacingGroupTable>

export const LETTERSPACING_DB_DATA: DBSectionData = {
  tableGroupName: 'letterSpacing',
  tokenTableName: 'letterSpacingToken',
  groupTableName: 'letterSpacingGroup',
  name: 'Letter Spacing',
}