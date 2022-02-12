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

  formatToken({varName, varValue}) {
    return `${this.tokenIndent}--${varName}: ${varValue};`
  }

  getCodeAfterTokens() {
    return `\n}`;
  }

  getTokenReference(tokenName: string) {
    return `var(--${tokenName})`;
  }
}