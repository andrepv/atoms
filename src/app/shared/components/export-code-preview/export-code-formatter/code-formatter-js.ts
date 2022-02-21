import { CodeFormatter } from "./code-formatter";

export class CodeFormatterJS extends CodeFormatter {
  constructor() {
    super();
  }

  getToken({tokenName, tokenValue}) {
    return `${this.tokenIndent}const ${tokenName} = "${tokenValue}";`
  }

  transformTokenName(value: string, prefix: string) {
    const splittedName = this.splitTokenName(value, prefix);
    return splittedName.map((chunk, index) => {
      return !index 
        ? chunk 
        : chunk.charAt(0).toUpperCase() + chunk.substr(1);
    }).join('');
  }
}