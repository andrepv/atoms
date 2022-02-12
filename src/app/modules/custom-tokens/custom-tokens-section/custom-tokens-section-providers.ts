import SectionManagerContentService from "@core/services/section-manager-content.service";
import SectionManagerGroupsService from "@core/services/section-manager-groups.service";
import SectionManagerTokensService from "@core/services/section-manager-tokens.service";
import { browserStorageDB } from "@core/storages/browser-storage/browser-storage-db";
import { ExportEditorSectionService } from "@shared/components/export-editor-section/export-editor-section.service";
import CustomTokensManagerTokensService from "../custom-tokens-managers/custom-tokens-managers-tokens.service";

export default [
  {provide: 'storage', useValue: browserStorageDB.customTokens},
  SectionManagerContentService,
  SectionManagerGroupsService,
  {
    useClass: CustomTokensManagerTokensService,
    provide: SectionManagerTokensService
  },
  ExportEditorSectionService,
]