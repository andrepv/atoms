import { Component, Injectable, OnInit } from '@angular/core';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { browserStorageDB } from '@core/storages/browser-storage/browser-storage-db';
import TextStyles from '@typography/text-styles-managers/text-styles';
import TextStylesManagerTokensService from '@typography/text-styles-managers/text-styles-manager-tokens.service';
import textStylesSectionProviders from '@typography/text-styles-section/text-styles-section-providers';
import { TextStylesDBToken } from '@typography/text-styles-section/text-styles.model';
import { standardFormatters } from '../export-code-formatter/standard-formatters';
import { CodeFormatterCSSTextStyles } from '../export-code-formatter/text-styles/code-formatter-text-styles-css';
import { CodeFormatterJSTextStyles } from '../export-code-formatter/text-styles/code-formatter-text-styles-js';
import { CodeFormatterSassTextStyles } from '../export-code-formatter/text-styles/code-formatter-text-styles-sass';
import { CodeFormatterScssTextStyles } from '../export-code-formatter/text-styles/code-formatter-text-styles-scss';
import { CodeFormatterStylusTextStyles } from '../export-code-formatter/text-styles/code-formatter-text-styles-styl';
import { ExportEditorSectionService } from '../export-editor-section/export-editor-section.service';
import { ExportEditorService } from '../export-editor/export-editor.service';


@Component({
  selector: 'app-export-editor-text-styles',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: [
    ...textStylesSectionProviders,
    ExportEditorSectionService
  ]
})
export class ExportEditorTextStylesComponent implements OnInit {
  codeFormatters = {
    css: CodeFormatterCSSTextStyles,
    js: CodeFormatterJSTextStyles,
    less: CodeFormatterCSSTextStyles,
    sass: CodeFormatterSassTextStyles,
    scss: CodeFormatterScssTextStyles,
    styl: CodeFormatterStylusTextStyles,
  }

  constructor(
    private tokens: SectionManagerTokensService<TextStylesDBToken>,
    private editorSection: ExportEditorSectionService,
    private editor: ExportEditorService,
  ) {}

  ngOnInit() {
    this.editorSection.codeFormatters = this.codeFormatters;
    this.editorSection.codePreviewConfigs = {useReferences: true};

    const manager = this.tokens as TextStylesManagerTokensService;
    manager.getTypeface = this.getTypeface;
    manager.getStyleValue = this.getStyleValue;
  }

  getStyleValue = async (token: TextStylesDBToken): Promise<any> => {
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
    const {useReferences} = this.editorSection.codePreviewConfigs;

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
    const formatter = new standardFormatters[this.editor.format]()
    const name = formatter.handleVariableName(tokenName, this.editor.prefix);
    return formatter.getTokenReference(name);
  }

  private getValue = (value: string, useReferences: boolean) => {
    if (this.editor.format === "js" && !useReferences) {
      const quote = value[0] === '"' || value[0] === "'" ? '' : '"'
      return `${quote}${value}${quote}`;
    }
    return value;
  }
}
