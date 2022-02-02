import { Injectable } from "@angular/core";
import SectionManagerTokensService from "@core/services/section-manager-tokens.service";
import { StorageGroup } from "@core/storages/storages-types";
import { CustomTokensDBToken } from "../custom-tokens.model";

@Injectable()
export default class CustomTokensManagerTokensService extends SectionManagerTokensService<CustomTokensDBToken, StorageGroup> {

  getDefaultValue() {
    return {
      value: 'empty',
    }
  }
}