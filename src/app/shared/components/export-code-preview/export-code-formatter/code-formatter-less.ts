import { CodeFormatter } from "./code-formatter";

export class CodeFormatterLess extends CodeFormatter {
  constructor() {
    super();
  }

  formatToken({varName, varValue}) {
    return `${this.tokenIndent}@${varName}: ${varValue};`
  }

  getTokenReference(tokenName: string) {
    return `@${tokenName}`;
  }
}