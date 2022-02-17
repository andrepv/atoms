import { Component, OnInit } from '@angular/core';
import colorPaletteSectionProviders from '@colors/color-palette-section/color-palette-section-providers';

@Component({
  selector: 'app-export-editor-colors',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: colorPaletteSectionProviders
})
export class ExportEditorColorsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
