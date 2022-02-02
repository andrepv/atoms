import { StoreService } from "@core/services/store.service";
import { TextStylesDBToken } from "@typography/text-styles-section/text-styles.model";

const defaultFontFamily = 'Arial';

export default class TextStyles {
  constructor(
    private token: TextStylesDBToken,
    private store: StoreService,
  ) {}

  get block() {
    return {
      color: this.token.color,
      backgroundColor: this.token.backgroundColor
    }
  }

  get text() {
    return {
      fontFamily: this.fontFamily,
      letterSpacing: this.letterSpacing,
      lineHeight: this.lineHeight,
      fontSize: this.fontSize,
      fontWeight: this.fontWeight,
      wordSpacing: this.wordSpacing,
      textDecoration: this.textDecoration,
      fontStyle: this.fontStyle,
    }
  }

  get fontFamily() {
    return this.getFontFamily()
  }

  get letterSpacing() {
    return `${this.token.letterSpacing}em`;
  }

  get lineHeight() {
    return this.token.lineHeight;
  }

  get fontSize() {
    return `${this.token.modularScaleTokenValue}px`;
  }

  get fontWeight() {
    return this.token.fontWeight;
  }

  get wordSpacing() {
    return `${this.token.wordSpacing}em`;
  }

  get textDecoration() {
    return this.token.textDecoration;
  }

  get fontStyle() {
    return this.token.fontStyle;
  }

  getFontFamily() {
    if (!this.token.typefaceId) {
      return defaultFontFamily;
    }

    const typeface = this.store.getSectionToken('Type Face', this.token.typefaceId);

    if (typeface) {
      return typeface.family
    }

    return defaultFontFamily;
  }
}