import { DBToken, DBGroup, DBTables, DBSectionData } from "@core/core.model";
import { ModularScaleState } from "@shared/components/modular-scale-editor/modular-scale-editor.model";

export type SpacingDBToken = DBToken & {value: number};
export type SpacingDBGroup = DBGroup & {scale: Pick<ModularScaleState, 'scaleRatio' | 'base'> | false};

export type SpacingTokenTable = Dexie.Table<SpacingDBToken, number>;
export type SpacingGroupTable = Dexie.Table<SpacingDBGroup, number>;

export type SpacingTables = DBTables<SpacingTokenTable, SpacingGroupTable>

export const SPACING_DB_DATA: DBSectionData = {
  tableGroupName: 'spacing',
  tokenTableName: 'spacingToken',
  groupTableName: 'spacingGroup',
  name: 'Spacing',
}