import { CodeFormatter } from "../code-formatter";
import { CodeFormatterJS } from "../code-formatter-js";

export class CodeFormatterJSTextStyles extends CodeFormatter {
  tokenIndent = ' ';

  constructor() {
    super();
  }

  getToken({tokenName, tokenValue}) {
    return `const ${tokenName} = {${tokenValue}\n}`;
  }

  transformTokenValue(styles: any) {
    return Object.entries(styles).reduce((previousValue, [name, value]) => 
    previousValue + `\n   "${name}": ${value},`, '');
  }

  transformTokenName(value: string, prefix: string) {
    const formatterJS = new CodeFormatterJS();
    return formatterJS.transformTokenName(value, prefix);
  }
}