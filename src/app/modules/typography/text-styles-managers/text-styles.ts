import { TextStylesDBToken } from "@typography/text-styles-section/text-styles.model";
import TextStylesManagerTokensService from "./text-styles-manager-tokens.service";

export default class TextStyles {
  constructor(
    private token: TextStylesDBToken,
    private tokensManager: TextStylesManagerTokensService,
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
    return this.tokensManager.getTypeface(this.token)
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
}