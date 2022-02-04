import { ColorPaletteContentService } from "@colors/color-palette-managers/color-palette-manager-content";
import ColorPaletteManagerGroupsService from "@colors/color-palette-managers/color-palette-manager-groups";
import ColorPaletteManagerTokensService from "@colors/color-palette-managers/color-palette-manager-tokens";
import SectionManagerContentService from "@core/services/section-manager-content.service";
import SectionManagerGroupsService from "@core/services/section-manager-groups.service";
import SectionManagerTokensService from "@core/services/section-manager-tokens.service";
import { browserStorageDB } from "@core/storages/browser-storage/browser-storage-db";

export default [
  {provide: 'storage', useValue: browserStorageDB.colorPalette},
  {
    provide: SectionManagerGroupsService,
    useClass: ColorPaletteManagerGroupsService
  },
  {
    provide: SectionManagerContentService,
    useClass: ColorPaletteContentService,
  },
  {
    provide: SectionManagerTokensService,
    useClass: ColorPaletteManagerTokensService,
  },
]