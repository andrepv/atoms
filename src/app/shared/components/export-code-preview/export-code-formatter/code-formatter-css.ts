import { CodeFormatter } from "./code-formatter";

export class CodeFormatterCSS extends CodeFormatter {
  tokenIndent = '  ';

  constructor() {
    super();
  }

  getCodeBeforeTokens() {
    const comment = super.getCodeBeforeTokens();
    return `${comment}:root {\n`;
  }

  getToken({tokenName, tokenValue}) {
    return `${this.tokenIndent}--${tokenName}: ${tokenValue};`
  }

  getCodeAfterTokens() {
    return `\n}`;
  }

  getTokenReference(tokenName: string) {
    return `var(--${tokenName})`;
  }
}