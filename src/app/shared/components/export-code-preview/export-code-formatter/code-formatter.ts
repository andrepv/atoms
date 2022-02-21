export abstract class CodeFormatter {
  tokenIndent = '';
  commentsAllowed = true;

  constructor() {}

  getComment(text: string) {
    return `/* ${text} */`;
  }

  getCodeBeforeTokens() {
    return '';
  }

  abstract getToken(data: {
    tokenName: string,
    tokenValue: string,
  }): string;

  getCodeAfterTokens() {
    return '';
  }

  getTokenReference(tokenName: string) {
    return tokenName;
  }

  transformTokenName(value: string, prefix: string) {
    const splittedName = this.splitTokenName(value, prefix)
    return splittedName.join('-');
  }

  transformTokenValue(value: any): Promise<string> | string {
    return value;
  }

  splitTokenName(value: string, prefix: string) {
    const name = `${prefix}-${value}`;
    const matches = name.trim().toLowerCase().match(/([a-z0-9]+)/gmi);
    if (matches) {
      return matches;
    }
    return ['']
  }
}