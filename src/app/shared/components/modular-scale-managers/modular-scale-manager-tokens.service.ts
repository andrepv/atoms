import { Injectable } from "@angular/core";
import { CacheGroup, CacheToken } from "@core/core-types";
import SectionManagerTokensService from "@core/services/section-manager-tokens.service";
import { StorageGroup, StorageToken } from "@core/storages/storages-types";
import { getScaleValue } from "@utils/get-type-scale-value";
import { ModularScaleToken, ModularScaleGroup } from "../modular-scale-editor/modular-scale-types";

@Injectable()
export default class ModularScaleManagerTokensService<T extends StorageToken = any, G extends StorageGroup = any> extends SectionManagerTokensService<T & ModularScaleToken, G & ModularScaleGroup> {

  getDefaultValue(group: CacheGroup) {
    const modularScaleTokenValue = getScaleValue(group.tokens.length, group.scaleRatio, group.scaleBase);

    return {
      modularScaleTokenValue,
      modularScaleTokenIsLocked: false,
    }
  }

  getStyleValue(token: CacheToken): any {
    return `${token.modularScaleTokenValue}${this.getUnits()}`;
  }

  getUnits() {
    return 'px';
  }
}