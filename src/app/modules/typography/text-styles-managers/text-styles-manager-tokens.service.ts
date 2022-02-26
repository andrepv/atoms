import { Injectable } from "@angular/core";
import { CacheGroup, CacheToken } from "@core/core-types";
import ModularScaleManagerTokensService from "@shared/components/modular-scale-managers/modular-scale-manager-tokens.service";
import TextStyles from "@typography/text-styles-managers/text-styles";
import { TextStylesDBToken, TextStylesDBGroup } from "@typography/text-styles-section/text-styles.model";
import { TypefaceDBToken } from "@typography/typeface-section/typeface.model";

@Injectable()
export default class TextStylesManagerTokensService extends ModularScaleManagerTokensService<TextStylesDBToken, TextStylesDBGroup> {

  getDefaultValue(group: CacheGroup<TextStylesDBGroup, TextStylesDBToken>) {
    return {
      letterSpacing: 0.01,
      lineHeight: 1.2,
      wordSpacing: 0,
      fontWeight: '400',
      textDecoration: 'none',
      fontStyle: 'normal',
      ...super.getDefaultValue(group)
    }
  }

  getStyleValue(
    token: TextStylesDBToken,
    group: CacheGroup<TextStylesDBGroup>
  ): TextStyles | Promise<TextStyles> {
    return new TextStyles(token, group, this);
  }

  getTypeface(
    token: TextStylesDBToken,
    group: TextStylesDBGroup,
  ): string | Promise<string> {
    const defaultFontFamily = 'Arial';
    let typefaceId = token.typefaceId || group.typefaceId;

    if (!typefaceId) {
      return defaultFontFamily;
    }

    const typeface: CacheToken<TypefaceDBToken> | false = this.cache.getSectionToken('Typefaces', typefaceId);

    if (typeface) {
      return typeface.family
    }

    return defaultFontFamily;
  }
}