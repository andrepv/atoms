import { CodeFormatter } from "./code-formatter";

export class CodeFormatterScss extends CodeFormatter {
  constructor() {
    super();
  }

  getToken({tokenName, tokenValue}) {
    return `${this.tokenIndent}$${tokenName}: ${tokenValue};`
  }

  getTokenReference(tokenName: string) {
    return `$${tokenName}`;
  }
}