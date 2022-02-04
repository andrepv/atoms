import { Component, OnInit } from '@angular/core';
import borderRadiusSectionProviders from '../../borders/border-radius-section/border-radius-section-providers';
import { ExportEditorSectionService } from '../export-editor-section/export-editor-section.service';

@Component({
  selector: 'app-export-editor-border-radius',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: [
    ...borderRadiusSectionProviders,
    ExportEditorSectionService
  ]
})
export class ExportEditorBorderRadiusComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
