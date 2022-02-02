import { Injectable } from "@angular/core";
import SectionManagerGroupsService from "@core/services/section-manager-groups.service";
import { StorageGroup, StorageToken } from "@core/storages/storages-types";
import { ModularScaleToken, ModularScaleGroup } from "../modular-scale-editor/modular-scale-types";

@Injectable()
export default class ModularScaleManagerGroupsService<T extends StorageToken & ModularScaleToken = any, G extends StorageGroup & ModularScaleGroup = any> extends SectionManagerGroupsService<T, G> {

  getDefaultValue() {
    return {
      scaleBase: 16,
      scaleRatio: 1.067
    } as any;
  }
}