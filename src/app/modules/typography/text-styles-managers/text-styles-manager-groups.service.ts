import { Injectable } from "@angular/core";
import ModularScaleManagerGroupsService from "@shared/components/modular-scale-managers/modular-scale-manager-groups.service";
import { TextStylesDBGroup, TextStylesDBToken } from "@typography/text-styles-section/text-styles.model";

@Injectable()
export default class TextStylesManagerGroupsService extends ModularScaleManagerGroupsService<TextStylesDBToken, TextStylesDBGroup> {

  getDefaultValue() {
    return {
      ...super.getDefaultValue(),
      view: 'default',
    }
  }
}