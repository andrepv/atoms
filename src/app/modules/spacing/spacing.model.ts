import { DBToken, DBGroup, DBTables, DBSectionData } from "@core/core.model";
import { ModularScaleGroup, ModularScaleToken } from "@shared/components/modular-scale-editor/modular-scale-types";

export type SpacingDBToken = DBToken & ModularScaleToken;
export type SpacingDBGroup = DBGroup & ModularScaleGroup;

export type SpacingTokenTable = Dexie.Table<SpacingDBToken, number>;
export type SpacingGroupTable = Dexie.Table<SpacingDBGroup, number>;

export type SpacingTables = DBTables<SpacingTokenTable, SpacingGroupTable>

export const SPACING_DB_DATA: DBSectionData = {
  tableGroupName: 'spacing',
  tokenTableName: 'spacingToken',
  groupTableName: 'spacingGroup',
  name: 'Spacing',
}