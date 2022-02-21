import { Injectable } from "@angular/core";
import SectionManagerGroupsService from "@core/services/section-manager-groups.service";
import { StorageModularScaleToken, StorageModularScaleGroup } from "../modular-scale-editor/modular-scale-types";

@Injectable()
export default class ModularScaleManagerGroupsService<T extends StorageModularScaleToken = any, G extends StorageModularScaleGroup = any> extends SectionManagerGroupsService<T, G> {
  scaleBase = 16;
  scaleRatio = 1.067;

  getDefaultValue(): any {
    return {
      scaleBase: this.scaleBase,
      scaleRatio: this.scaleRatio
    }
  }
}