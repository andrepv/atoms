import SectionManagerContentService from "@core/services/section-manager-content.service";
import SectionManagerGroupsService from "@core/services/section-manager-groups.service";
import SectionManagerTokensService from "@core/services/section-manager-tokens.service";
import { browserStorageDB } from "@core/storages/browser-storage/browser-storage-db";
import { ExportEditorSectionService } from "@shared/components/export-editor-section/export-editor-section.service";
import ModularScaleManagerGroupsService from "@shared/components/modular-scale-managers/modular-scale-manager-groups.service";
import DurationManagerTokensService from "../duration-managers/duration-managers-manager-tokens.service";

export default [
  {provide: 'storage', useValue: browserStorageDB.durations},
  SectionManagerContentService,
  {
    useClass: DurationManagerTokensService,
    provide: SectionManagerTokensService
  },
  {
    useClass: ModularScaleManagerGroupsService,
    provide: SectionManagerGroupsService
  },
  ExportEditorSectionService,
]