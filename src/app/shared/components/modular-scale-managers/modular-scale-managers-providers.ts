import SectionManagerContentService from "@core/services/section-manager-content.service";
import SectionManagerGroupsService from "@core/services/section-manager-groups.service";
import SectionManagerTokensService from "@core/services/section-manager-tokens.service";
import ModularScaleManagerGroupsService from "./modular-scale-manager-groups.service";
import ModularScaleManagerTokensService from "./modular-scale-manager-tokens.service";

export default [
  SectionManagerContentService,
  {
    useClass: ModularScaleManagerTokensService,
    provide: SectionManagerTokensService
  },
  {
    useClass: ModularScaleManagerGroupsService,
    provide: SectionManagerGroupsService
  },
]