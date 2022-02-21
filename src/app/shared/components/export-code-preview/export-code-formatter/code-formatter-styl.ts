import { CodeFormatter } from "./code-formatter";

export class CodeFormatterStyl extends CodeFormatter {
  constructor() {
    super();
  }

  getToken({tokenName, tokenValue}) {
    return `${this.tokenIndent}${tokenName} = ${tokenValue}`
  }
}