import { Component, OnInit } from '@angular/core';
import typefaceSectionProviders from '@typography/typeface-section/typeface-section-providers';

@Component({
  selector: 'app-export-editor-typeface',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: typefaceSectionProviders
})
export class ExportEditorTypefaceComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
