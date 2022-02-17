import { Injectable } from "@angular/core";
import ModularScaleManagerTokensService from "@shared/components/modular-scale-managers/modular-scale-manager-tokens.service";
import { DurationsDBToken, DurationsDBGroup } from "@durations/durations.model";

@Injectable()
export default class DurationManagerTokensService extends ModularScaleManagerTokensService<DurationsDBToken, DurationsDBGroup> {

  getUnits() {
    return 'ms';
  }
}