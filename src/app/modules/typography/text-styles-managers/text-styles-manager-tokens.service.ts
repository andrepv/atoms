import { Injectable } from "@angular/core";
import { StoreGroup } from "@core/core-types";
import ModularScaleManagerTokensService from "@shared/components/modular-scale-managers/modular-scale-manager-tokens.service";
import { TextStylesDBToken, TextStylesDBGroup } from "@typography/text-styles-section/text-styles.model";

@Injectable()
export default class TextStylesManagerTokensService extends ModularScaleManagerTokensService<TextStylesDBToken, TextStylesDBGroup> {
  readonly DEFAULT_TEXT = 'Quick brown fox jumped over the lazy red dog';

  getDefaultValue(group: StoreGroup<TextStylesDBGroup, TextStylesDBToken>) {
    return {
      text: this.DEFAULT_TEXT,
      backgroundColor: '#1e2022',
      color: '#D6D6D6',
      typefaceId: 0,
      letterSpacing: 0.01,
      lineHeight: 1.2,
      wordSpacing: 0,
      fontWeight: '400',
      textDecoration: 'none',
      fontStyle: 'normal',
      ...super.getDefaultValue(group)
    }
  }
}