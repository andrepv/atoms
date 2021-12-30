import { Component, Input, OnInit } from '@angular/core';
import { db } from '@core/indexedDB';
import { SpacingDBToken } from '@spacing/spacing.model';
import { ExportEditorSectionService } from '../export-editor-section/export-editor-section.service';

@Component({
  selector: 'app-export-editor-spacing',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: [
    {provide: 'tables', useValue: db.spacing},
    ExportEditorSectionService
  ]
})
export class ExportEditorSpacingComponent implements OnInit {
  constructor(private editorSection: ExportEditorSectionService) {}

  ngOnInit() {
    this.editorSection.getTokenValue = (token: SpacingDBToken) => `${token.value}px`;
  }
}
