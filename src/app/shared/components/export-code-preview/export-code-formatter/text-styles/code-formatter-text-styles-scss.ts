import { CodeFormatter } from "../code-formatter";

export class CodeFormatterScssTextStyles extends CodeFormatter {
  tokenIndent = ' ';
  commentsAllowed = false;

  constructor() {
    super();
  }

  formatToken({varName, varValue}) {
    return `@mixin ${varName} {${varValue}\n}`
  }

  handleVariableValue(styles: any) {
    return Object.entries(styles).reduce((previousValue, [name, value]) => {
      const styleProperty = `\n   ${name}: ${value};`;
      return previousValue + styleProperty;
    }, '')
  }
}