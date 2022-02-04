import { Component, OnInit } from '@angular/core';
import spacingSectionProviders from '@spacing/spacing-section/spacing-section-providers';
import { ExportEditorSectionService } from '../export-editor-section/export-editor-section.service';

@Component({
  selector: 'app-export-editor-spacing',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: [
    ...spacingSectionProviders,
    ExportEditorSectionService
  ]
})
export class ExportEditorSpacingComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
