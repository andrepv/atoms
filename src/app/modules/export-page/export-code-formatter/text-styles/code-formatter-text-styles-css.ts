import TextStyles from "@typography/text-styles-managers/text-styles";
import { CodeFormatter } from "../code-formatter";

export class CodeFormatterCSSTextStyles extends CodeFormatter {
  tokenIndent = ' ';
  commentsAllowed = false;

  constructor() {
    super();
  }

  formatToken({varName, varValue}) {
    
    return `.${varName} {${varValue}\n}`
  }

  async handleVariableValue(styles: TextStyles) {
    return Object.entries(styles).reduce((previousValue, [name, value]) => {
      const styleProperty = `\n   ${name}: ${value};`;
      return previousValue + styleProperty;
    }, '')
  }
}