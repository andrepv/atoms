import { Component, OnInit } from '@angular/core';
import spacingSectionProviders from '@spacing/spacing-section/spacing-section-providers';

@Component({
  selector: 'app-export-editor-spacing',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: spacingSectionProviders
})
export class ExportEditorSpacingComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
