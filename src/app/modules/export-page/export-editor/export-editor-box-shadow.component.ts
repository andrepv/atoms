import { Component, OnInit } from '@angular/core';
import boxShadowSectionProviders from '@shadows/box-shadow-section/box-shadow-section-providers';
import { ExportEditorSectionService } from '../export-editor-section/export-editor-section.service';

@Component({
  selector: 'app-export-editor-box-shadow',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: [
    ...boxShadowSectionProviders,
    ExportEditorSectionService
  ]
})
export class ExportEditorBoxShadowComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
