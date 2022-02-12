import SectionManagerContentService from "@core/services/section-manager-content.service";
import SectionManagerGroupsService from "@core/services/section-manager-groups.service";
import SectionManagerTokensService from "@core/services/section-manager-tokens.service";
import { browserStorageDB } from "@core/storages/browser-storage/browser-storage-db";
import { ExportEditorSectionService } from "@shared/components/export-editor-section/export-editor-section.service";
import BordersManagerTokensService from "../borders-managers/borders-manager-tokens.service";

export default [
  {provide: 'storage', useValue: browserStorageDB.border},
  {
    useClass: BordersManagerTokensService,
    provide: SectionManagerTokensService
  },
  SectionManagerContentService,
  SectionManagerGroupsService,
  ExportEditorSectionService,
]