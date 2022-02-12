import SectionManagerContentService from "@core/services/section-manager-content.service";
import SectionManagerGroupsService from "@core/services/section-manager-groups.service";
import SectionManagerTokensService from "@core/services/section-manager-tokens.service";
import { browserStorageDB } from "@core/storages/browser-storage/browser-storage-db";
import { ExportEditorSectionService } from "@shared/components/export-editor-section/export-editor-section.service";
import { TypefaceExportEditorService } from "@typography/typeface-export/typeface-export-editor.service";
import { TypefaceManagerContentService } from "@typography/typeface-managers/typeface-manager-content.service";
import TypefaceManagerTokensService from "@typography/typeface-managers/typeface-manager-tokens.service";

export default [
  {provide: 'storage', useValue: browserStorageDB.typeface},
  SectionManagerGroupsService,
  {
    useClass: TypefaceManagerContentService,
    provide: SectionManagerContentService
  },
  {
    useClass: TypefaceManagerTokensService,
    provide: SectionManagerTokensService
  },
  {
    provide: ExportEditorSectionService,
    useClass: TypefaceExportEditorService,
  },
]