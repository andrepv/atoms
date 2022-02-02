import { Injectable } from "@angular/core";
import SectionManagerTokensService from "@core/services/section-manager-tokens.service";
import { StorageGroup } from "@core/storages/storages-types";
import { TypefaceDBToken } from "@typography/typeface-section/typeface.model";

@Injectable()
export default class TypefaceManagerTokensService extends SectionManagerTokensService<TypefaceDBToken, StorageGroup> {
  getDefaultValue() {
    return {
      family: 'Arial',
      type: "custom-font",
      data: '',
    }
  }
}