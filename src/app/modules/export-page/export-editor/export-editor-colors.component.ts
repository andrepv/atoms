import { Component, OnInit } from '@angular/core';
import { ColorPaletteDBToken } from '@colors/color-palette-section/color-palette.model';
import { db } from '@core/indexedDB';
import chroma from 'chroma-js';
import { ExportEditorSectionService } from '../export-editor-section/export-editor-section.service';

@Component({
  selector: 'app-export-editor-colors',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: [
    {provide: 'tables', useValue: db.colorPalette},
    ExportEditorSectionService,
  ]
})
export class ExportEditorColorsComponent implements OnInit {
  constructor(private editorSection: ExportEditorSectionService) {}

  ngOnInit() {
    this.editorSection.codePreviewConfigs = {colorFormat: 'hex'};

    this.editorSection.getTokenValue = (token: ColorPaletteDBToken) => {
      let color = token.color;
      const {colorFormat} = this.editorSection.codePreviewConfigs;
  
      if (colorFormat === 'rgb') {
        color = chroma(token.color).css()
      } else if (colorFormat === 'hsl') {
        color = chroma(token.color).css('hsl');
      }

      return color;
    }
  }
}
