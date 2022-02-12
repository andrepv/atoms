import { Injectable } from "@angular/core";
import { browserStorageDB } from "@core/storages/browser-storage/browser-storage-db";
import TextStyles from "@typography/text-styles-managers/text-styles";
import { TextStylesDBToken } from "@typography/text-styles-section/text-styles.model";
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

  async getStyleValue(token: TextStylesDBToken) {
    let styles: Partial<TextStyles['text']> = {
      letterSpacing: `${token.letterSpacing}em`,
      lineHeight: token.lineHeight,
      fontSize: `${token.modularScaleTokenValue}px`,
      fontWeight: token.fontWeight,
    };

    if (token.fontStyle !== 'normal') {
      styles.fontStyle = token.fontStyle;
    }

    if (token.textDecoration !== 'none') {
      styles.textDecoration = token.textDecoration
    }

    if (token.wordSpacing !== 0) {
      styles.wordSpacing = `${token.wordSpacing}em`;
    }

    const fontFamily = await this.getTypeface(token);
    if (fontFamily) {
      styles.fontFamily = fontFamily;
    }

    return styles;
  }

  getTypeface = async (token: TextStylesDBToken) => {
    let fontFamily = "";
    const {useReferences} = this.codePreviewConfigs;

    if (token.typefaceId) {
      const typefaceTokens = await browserStorageDB.typeface.tokens.get({index: 'id', key: token.typefaceId})

      const typefaceToken = typefaceTokens[0];

      if (typefaceToken) {
        fontFamily = useReferences 
          ? this.getReference(typefaceToken.name)
          : this.getValue(`"${typefaceToken.family}"`, useReferences);
      }
    }

    return fontFamily;
  }

  private getReference = (tokenName: string) => {
    const formatter = new standardFormatters[this.editor.configs.format]()
    const name = formatter.handleVariableName(tokenName, this.editor.configs.prefix);
    return formatter.getTokenReference(name);
  }

  private getValue = (value: string, useReferences: boolean) => {
    if (this.editor.configs.format === "js" && !useReferences) {
      const quote = value[0] === '"' || value[0] === "'" ? '' : '"'
      return `${quote}${value}${quote}`;
    }
    return value;
  }
}