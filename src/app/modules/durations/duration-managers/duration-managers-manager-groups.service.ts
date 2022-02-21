import { Injectable } from "@angular/core";
import { DurationsDBToken, DurationsDBGroup } from "@durations/durations.model";
import ModularScaleManagerGroupsService from "@shared/components/modular-scale-managers/modular-scale-manager-groups.service";

@Injectable()
export default class DurationManagerGroupsService extends ModularScaleManagerGroupsService<DurationsDBToken, DurationsDBGroup> {
  scaleBase = 300;
}