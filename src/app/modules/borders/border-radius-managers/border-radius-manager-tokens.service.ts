import { Injectable } from "@angular/core";
import SectionManagerTokensService from "@core/services/section-manager-tokens.service";
import { StorageGroup } from "@core/storages/storages-types";
import { BorderRadiusDBToken } from "../border-radius-section/border-radius.model";

@Injectable()
export default class BorderRadiusManagerTokensService extends SectionManagerTokensService<BorderRadiusDBToken, StorageGroup> {

  getDefaultValue() {
    return {
      radius: 0
    }
  }
}