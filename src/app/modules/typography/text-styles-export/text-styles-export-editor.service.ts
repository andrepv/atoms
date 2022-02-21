import { Injectable } from "@angular/core";
import { browserStorageDB } from "@core/storages/browser-storage/browser-storage-db";
import { TextStylesDBGroup, TextStylesDBToken } from "@typography/text-styles-section/text-styles.model";
import { BehaviorSubject } from "rxjs";
import { ExportEditorSectionService } from "@shared/components/export-editor-section/export-editor-section.service";
import { standardFormatters } from "@shared/components/export-code-preview/export-code-formatter/standard-formatters";
import { CodeFormatterCSSTextStyles } from "@shared/components/export-code-preview/export-code-formatter/text-styles/code-formatter-text-styles-css";
import { CodeFormatterJSTextStyles } from "@shared/components/export-code-preview/export-code-formatter/text-styles/code-formatter-text-styles-js";
import { CodeFormatterSassTextStyles } from "@shared/components/export-code-preview/export-code-formatter/text-styles/code-formatter-text-styles-sass";
import { CodeFormatterScssTextStyles } from "@shared/components/export-code-preview/export-code-formatter/text-styles/code-formatter-text-styles-scss";
import { CodeFormatterStylusTextStyles } from "@shared/components/export-code-preview/export-code-formatter/text-styles/code-formatter-text-styles-styl";

@Injectable()
export class TextStylesExportEditorService extends ExportEditorSectionService {
  codeFormatters = {
    css: CodeFormatterCSSTextStyles,
    js: CodeFormatterJSTextStyles,
    less: CodeFormatterCSSTextStyles,
    sass: CodeFormatterSassTextStyles,
    scss: CodeFormatterScssTextStyles,
    styl: CodeFormatterStylusTextStyles,
  }

  codePreviewConfigs$ = new BehaviorSubject<any>({useReferences: true})

  async getStyleValue(data: {
    token: TextStylesDBToken,
    group: TextStylesDBGroup
  }) {
    const {token, group} = data;

    let styles: {[key: string]: string | number} = {
      "letter-spacing": this.transformStyleValue(`${token.letterSpacing}em`),
      "line-height": this.transformStyleValue(token.lineHeight),
      "font-size": this.transformStyleValue(`${token.modularScaleTokenValue}px`),
      "font-weight": this.transformStyleValue(token.fontWeight),
    }

    if (token.fontStyle !== 'normal') {
      styles["font-style"] = this.transformStyleValue(token.fontStyle);
    }

    if (token.textDecoration !== 'none') {
      styles["text-decoration"] = this.transformStyleValue(token.textDecoration)
    }

    if (token.wordSpacing !== 0) {
      styles["word-spacing"] = this.transformStyleValue(`${token.wordSpacing}em`);
    }

    const fontFamily = await this.getTypeface(token, group);

    if (fontFamily) {
      styles["font-family"] = fontFamily;
    }

    return styles;
  }

  private async getTypeface(
    token: TextStylesDBToken,
    group: TextStylesDBGroup
  ) {
    let fontFamily = "";
    const {useReferences} = this.codePreviewConfigs;
    const typefaceId = token.typefaceId || group.typefaceId;

    if (typefaceId) {
      const typefaceTokens = await browserStorageDB.typeface.tokens.get({index: 'id', key: typefaceId});

      const typefaceToken = typefaceTokens[0];

      if (typefaceToken) {
        fontFamily = useReferences 
          ? this.getTypefaceReference(typefaceToken.name)
          : this.transformTypefaceValue(`"${typefaceToken.family}"`, useReferences);
      }
    }

    return fontFamily;
  }

  private getTypefaceReference(tokenName: string) {
    const formatter = new standardFormatters[this.editor.configs.format]()
    const name = formatter.transformTokenName(tokenName, this.editor.configs.prefix);
    return formatter.getTokenReference(name);
  }

  private transformTypefaceValue(value: string, useReferences: boolean) {
    if (this.editor.configs.format === "js" && !useReferences) {
      const quote = value[0] === '"' || value[0] === "'" ? '' : '"'
      return `${quote}${value}${quote}`;
    }
    return value;
  }

  private transformStyleValue(value: string | number) {
    if (this.editor.configs.format !== "js") return value;
    return `"${value}"`;
  }
}