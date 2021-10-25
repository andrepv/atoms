import { DBSectionData, ITables, TokenGroupModel, TokenModel } from "../../services/db.service";

export type SpacingTokenValue = number;
export type SpacingGroupState = {scale: {base: number, scaleRatio: number} | false};

export type SpacingTokenModel = TokenModel<SpacingTokenValue>;
export type SpacingGroupModel = TokenGroupModel<number>;

export type SpacingTokenTable = Dexie.Table<SpacingTokenModel, number>;
export type SpacingGroupTable = Dexie.Table<SpacingGroupModel, number>;

export type SpacingTables = ITables<SpacingTokenTable, SpacingGroupTable>

export const SPACING_DB_DATA: DBSectionData = {
  tableGroupName: 'spacing',
  tokenTableName: 'spacingToken',
  groupTableName: 'spacingGroup',
  name: 'Spacing',
}