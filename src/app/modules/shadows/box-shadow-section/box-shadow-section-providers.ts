import SectionManagerContentService from "@core/services/section-manager-content.service";
import SectionManagerGroupsService from "@core/services/section-manager-groups.service";
import SectionManagerTokensService from "@core/services/section-manager-tokens.service";
import { browserStorageDB } from "@core/storages/browser-storage/browser-storage-db";
import BoxShadowManagerTokensService from "@shadows/box-shadow-managers/box-shadow-manager-tokens.service";

export default [
  {provide: 'storage', useValue: browserStorageDB.boxShadow},
  {
    useClass: BoxShadowManagerTokensService,
    provide: SectionManagerTokensService
  },
  SectionManagerContentService,
  SectionManagerGroupsService,
]