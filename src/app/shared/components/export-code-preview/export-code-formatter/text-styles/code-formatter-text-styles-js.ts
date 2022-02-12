import { CodeFormatter } from "../code-formatter";
import { CodeFormatterJS } from "../code-formatter-js";

export class CodeFormatterJSTextStyles extends CodeFormatter {
  tokenIndent = ' ';
  commentsAllowed = false;

  constructor() {
    super();
  }

  formatToken({varName, varValue}) {
    return `const ${varName} = {${varValue}\n}`;
  }

  handleVariableValue(styles: any) {
    return Object.entries(styles).reduce((previousValue, [name, value]) => 
    previousValue + `\n   "${name}": ${value},`, '');
  }

  handleVariableName(value: string, prefix: string) {
    const formatterJS = new CodeFormatterJS();
    return formatterJS.handleVariableName(value, prefix);
  }
}