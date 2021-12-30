import { Component, OnInit } from '@angular/core';
import { db } from '@core/indexedDB';
import { LineHeightDBToken } from '@typography/line-height-section/line-height.model';
import { ExportEditorSectionService } from '../export-editor-section/export-editor-section.service';

@Component({
  selector: 'app-export-editor-line-height',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: [
    {provide: 'tables', useValue: db.lineHeight},
    ExportEditorSectionService,
  ]
})
export class ExportEditorLineHeightComponent implements OnInit {
  constructor(private editorSection: ExportEditorSectionService) {}

  ngOnInit() {
    this.editorSection.getTokenValue = (token: LineHeightDBToken) => {
      return `${token.value}`
    }
  }
}
