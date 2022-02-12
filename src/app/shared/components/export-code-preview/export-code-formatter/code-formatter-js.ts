import { CodeFormatter } from "./code-formatter";

export class CodeFormatterJS extends CodeFormatter {
  constructor() {
    super();
  }

  formatToken({varName, varValue}) {
    return `${this.tokenIndent}const ${varName} = "${varValue}";`
  }

  handleVariableName(value: string, prefix: string) {
    const splittedName = this.splitVariableName(value, prefix);
    return splittedName.map((chunk, index) => {
      return !index 
        ? chunk 
        : chunk.charAt(0).toUpperCase() + chunk.substr(1);
    }).join('');
  }
}