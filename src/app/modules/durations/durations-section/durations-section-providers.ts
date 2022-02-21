import { forwardRef } from "@angular/core";
import SectionManagerContentService from "@core/services/section-manager-content.service";
import SectionManagerGroupsService from "@core/services/section-manager-groups.service";
import SectionManagerTokensService from "@core/services/section-manager-tokens.service";
import { browserStorageDB } from "@core/storages/browser-storage/browser-storage-db";
import { ExportEditorSectionService } from "@shared/components/export-editor-section/export-editor-section.service";
import DurationManagerTokensService from "@durations/duration-managers/duration-managers-manager-tokens.service";
import DurationManagerGroupsService from "../duration-managers/duration-managers-manager-groups.service";

export default [
  {provide: 'storage', useValue: browserStorageDB.durations},
  SectionManagerContentService,
  {
    useClass: DurationManagerTokensService,
    provide: SectionManagerTokensService
  },
  {
    useExisting: forwardRef(() => SectionManagerTokensService) ,
    provide: DurationManagerTokensService,
  },
  {
    useClass: DurationManagerGroupsService,
    provide: SectionManagerGroupsService
  },
  ExportEditorSectionService,
]