import { DBToken, DBGroup, DBTables, DBSectionData } from "@core/core.model";

export type LetterSpacingDBToken = DBToken & {value: number};
export type LetterSpacingDBGroup = DBGroup & {textPreviewId: number};

export type LetterSpacingTokenTable = Dexie.Table<LetterSpacingDBToken, number>;
export type LetterSpacingGroupTable = Dexie.Table<DBGroup, number>;

export type LetterSpacingTables = DBTables<LetterSpacingTokenTable, LetterSpacingGroupTable>

export const LETTERSPACING_DB_DATA: DBSectionData = {
  tableGroupName: 'letterSpacing',
  tokenTableName: 'letterSpacingToken',
  groupTableName: 'letterSpacingGroup',
  name: 'Letter Spacing',
}