import TextStyles from "@typography/text-styles-managers/text-styles";
import { CodeFormatter } from "../code-formatter";

export class CodeFormatterCSSTextStyles extends CodeFormatter {
  tokenIndent = ' ';
  constructor() {
    super();
  }

  getToken({tokenName, tokenValue}) {
    return `.${tokenName} {${tokenValue}\n}`
  }

  async transformTokenValue(styles: TextStyles) {
    return Object.entries(styles).reduce((previousValue, [name, value]) => {
      const styleProperty = `\n   ${name}: ${value};`;
      return previousValue + styleProperty;
    }, '')
  }
}