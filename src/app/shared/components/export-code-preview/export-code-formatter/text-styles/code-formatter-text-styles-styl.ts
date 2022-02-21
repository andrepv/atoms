import { CodeFormatter } from "../code-formatter";

export class CodeFormatterStylusTextStyles extends CodeFormatter {
  tokenIndent = ' ';

  constructor() {
    super();
  }

  getToken({tokenName, tokenValue}) {
    return `${tokenName}() ${tokenValue}\n`
  }

  transformTokenValue(styles: any) {
    return Object.entries(styles).reduce((previousValue, [name, value]) => {
      const styleProperty = `\n   ${name}: ${value}`;
      return previousValue + styleProperty;
    }, '')
  }
}