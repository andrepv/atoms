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

  abstract formatToken(data: {
    varName: string,
    varValue: string,
  }): string;

  getCodeAfterTokens() {
    return '';
  }

  getTokenReference(tokenName: string) {
    return tokenName;
  }

  handleVariableName(value: string, prefix: string) {
    const splittedName = this.splitVariableName(value, prefix)
    return splittedName.join('-');
  }

  handleVariableValue(value: any): Promise<string> | string {
    return value;
  }

  splitVariableName(value: string, prefix: string) {
    const name = `${prefix}-${value}`;
    const matches = name.trim().toLowerCase().match(/([a-z0-9]+)/gmi);
    if (matches) {
      return matches;
    }
    return ['']
  }
}