import { Component, OnInit } from '@angular/core';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import typefaceSectionProviders from '@typography/typeface-section/typeface-section-providers';
import { TypefaceDBToken } from '@typography/typeface-section/typeface.model';
import { ExportEditorSectionService } from '../export-editor-section/export-editor-section.service';
import { ExportEditorService } from './export-editor.service';

@Component({
  selector: 'app-export-editor-typeface',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: [
    ...typefaceSectionProviders,
    ExportEditorSectionService
  ]
})
export class ExportEditorTypefaceComponent implements OnInit {
  constructor(
    private tokensManager: SectionManagerTokensService,
    private editor: ExportEditorService,
    ) {}

  ngOnInit() {
    this.tokensManager.getStyleValue = (token: TypefaceDBToken) => {
      const quote = this.editor.commonConfigs.format === "js" ? '' : '"';
      return `${quote}${token.family}${quote}`;
    };
  }
}
