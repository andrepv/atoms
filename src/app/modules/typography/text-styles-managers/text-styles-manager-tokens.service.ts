import { Injectable } from "@angular/core";
import { StoreGroup, StoreToken } from "@core/core-types";
import ModularScaleManagerTokensService from "@shared/components/modular-scale-managers/modular-scale-manager-tokens.service";
import TextStyles from "@typography/text-styles-managers/text-styles";
import { TextStylesDBToken, TextStylesDBGroup } from "@typography/text-styles-section/text-styles.model";
import { TypefaceDBToken } from "@typography/typeface-section/typeface.model";

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

  getStyleValue(token: TextStylesDBToken): TextStyles | Promise<TextStyles> {
    return new TextStyles(token, this);
  }

  getTypeface(token: TextStylesDBToken): string | Promise<string> {
    const defaultFontFamily = 'Arial';

    if (!token.typefaceId) {
      return defaultFontFamily;
    }

    const typeface: StoreToken<TypefaceDBToken> | false = this.store.getSectionToken('Type Face', token.typefaceId);

    if (typeface) {
      return typeface.family
    }

    return defaultFontFamily;
  }
}