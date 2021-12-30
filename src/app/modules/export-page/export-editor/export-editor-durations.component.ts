import { Component, OnInit } from '@angular/core';
import { db } from '@core/indexedDB';
import { DurationsDBToken } from '../../durations/durations.model';
import { ExportEditorSectionService } from '../export-editor-section/export-editor-section.service';

@Component({
  selector: 'app-export-editor-durations',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: [
    {provide: 'tables', useValue: db.durations},
    ExportEditorSectionService
  ]
})
export class ExportEditorDurationsComponent implements OnInit {
  constructor(private editorSection: ExportEditorSectionService) {}

  ngOnInit() {
    this.editorSection.getTokenValue = (token: DurationsDBToken) => `${token.value}ms`;
  }
}
