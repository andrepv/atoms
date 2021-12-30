import { Component, OnInit } from '@angular/core';
import { db } from '@core/indexedDB';
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
    {provide: 'tables', useValue: db.textStyles},
    ExportEditorSectionService
  ]
})
export class ExportEditorTextStylesComponent implements OnInit {
  codeFormatters = {
    css: CodeFormatterCSSTextStyles,
    js: CodeFormatterJSTextStyles,
    less: CodeFormatterCSSTextStyles,
    sass: CodeFormatterScssTextStyles,
    scss: CodeFormatterSassTextStyles,
    styl: CodeFormatterStylusTextStyles,
  }

  constructor(
    private editorSection: ExportEditorSectionService,
    private editor: ExportEditorService,
  ) {}

  ngOnInit() {
    this.editorSection.codeFormatters = this.codeFormatters;
    this.editorSection.codePreviewConfigs = {useReferences: true};
    this.editorSection.getTokenValue = this.getTokenValue;
  }

  getTokenValue = async ({styles}: TextStylesDBToken) => {
    const {useReferences} = this.editorSection.codePreviewConfigs;
    const textStyles: {
      "font-family"?: string,
      "font-size"?: string,
      "line-height"?: string,
      "letter-spacing"?: string,
    } = {};

    if (!Object.values(styles).length) return {};

    if (styles.fontFamily) {
      const typefaceToken = await db.typeface.tokenTable.get(styles.fontFamily);
      if (typefaceToken) {
        textStyles["font-family"] = useReferences 
        ? this.getReference(typefaceToken.name)
        : this.getValue(`"${typefaceToken.family}"`, useReferences);
      }
    }

    if (styles.fontSize) {
      const typescaleToken = await db.typescale.tokenTable.get(styles.fontSize);
      if (typescaleToken) {
        textStyles["font-size"] = useReferences
        ? this.getReference(typescaleToken.name)
        : this.getValue(`${typescaleToken.value}px`, useReferences);
      }
    }

    if (styles.lineHeight) {
      const lineHeightToken = await db.lineHeight.tokenTable.get(styles.lineHeight);
      if (lineHeightToken) {
        textStyles["line-height"] = useReferences 
        ? this.getReference(lineHeightToken.name)
        : this.getValue(`${lineHeightToken.value}px`, useReferences);
      }
    }

    if (styles.letterSpacing) {
      const letterSpacingToken = await db.letterSpacing.tokenTable.get(styles.letterSpacing);
      if (letterSpacingToken) {
        textStyles["letter-spacing"] = useReferences
        ? this.getReference(letterSpacingToken.name)
        : this.getValue(`${letterSpacingToken.value}em`, useReferences);
      }
    }

    return textStyles;
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
