import { Component, OnInit } from '@angular/core';
import colorPaletteSectionProviders from '@colors/color-palette-section/color-palette-section-providers';
import { ColorPaletteDBToken } from '@colors/color-palette-section/color-palette.model';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import chroma from 'chroma-js';
import { ExportEditorSectionService } from '../export-editor-section/export-editor-section.service';

@Component({
  selector: 'app-export-editor-colors',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: [
    colorPaletteSectionProviders,
    ExportEditorSectionService,
  ]
})
export class ExportEditorColorsComponent implements OnInit {
  constructor(
    private editorSection: ExportEditorSectionService,
    private tokensManager: SectionManagerTokensService
  ) {}

  ngOnInit() {
    this.tokensManager.getStyleValue = (token: ColorPaletteDBToken) => {
      const {colorFormat} = this.editorSection.codePreviewConfigs;

      let color = token.color;
  
      if (colorFormat === 'rgb') {
        color = chroma(token.color).css()
      } else if (colorFormat === 'hsl') {
        color = chroma(token.color).css('hsl');
      }

      return color;
    }
  }
}
