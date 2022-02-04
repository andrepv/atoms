import SectionManagerContentService from "@core/services/section-manager-content.service";
import SectionManagerGroupsService from "@core/services/section-manager-groups.service";
import SectionManagerTokensService from "@core/services/section-manager-tokens.service";
import { browserStorageDB } from "@core/storages/browser-storage/browser-storage-db";
import TextStylesManagerGroupsService from "@typography/text-styles-managers/text-styles-manager-groups.service";
import TextStylesManagerTokensService from "@typography/text-styles-managers/text-styles-manager-tokens.service";

export default [
  {provide: 'storage', useValue: browserStorageDB.textStyles},
  SectionManagerContentService,
  {
    useClass: TextStylesManagerTokensService,
    provide: SectionManagerTokensService
  },
  {
    useClass: TextStylesManagerGroupsService,
    provide: SectionManagerGroupsService
  },
]