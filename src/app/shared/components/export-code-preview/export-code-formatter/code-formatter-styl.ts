import { CodeFormatter } from "./code-formatter";

export class CodeFormatterStyl extends CodeFormatter {
  constructor() {
    super();
  }

  formatToken({varName, varValue}) {
    return `${this.tokenIndent}${varName} = ${varValue}`
  }
}