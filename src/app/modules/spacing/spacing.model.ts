import { DBToken, DBGroup, DBTables, DBSectionData } from "@core/core.model";
import { ModularScaleState } from "@shared/components/modular-scale-editor/modular-scale-editor.component";

export type SpacingTokenValue = number;
export type SpacingGroupState = {scale: Pick<ModularScaleState, 'scaleRatio' | 'base'> | false};

export type SpacingTokenModel = DBToken<SpacingTokenValue>;
export type SpacingGroupModel = DBGroup<SpacingGroupState>;

export type SpacingTokenTable = Dexie.Table<SpacingTokenModel, number>;
export type SpacingGroupTable = Dexie.Table<SpacingGroupModel, number>;

export type SpacingTables = DBTables<SpacingTokenTable, SpacingGroupTable>

export const SPACING_DB_DATA: DBSectionData = {
  tableGroupName: 'spacing',
  tokenTableName: 'spacingToken',
  groupTableName: 'spacingGroup',
  name: 'Spacing',
}