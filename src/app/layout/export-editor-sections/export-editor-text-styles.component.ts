import { Component, OnInit } from '@angular/core';
import textStylesSectionProviders from '@typography/text-styles-section/text-styles-section-providers';

@Component({
  selector: 'app-export-editor-text-styles',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: textStylesSectionProviders
})
export class ExportEditorTextStylesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
