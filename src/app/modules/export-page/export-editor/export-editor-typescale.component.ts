import { Component, OnInit } from '@angular/core';
import { db } from '@core/indexedDB';
import { TypescaleDBToken } from '@typography/typescale-section/typescale.model';
import { ExportEditorSectionService } from '../export-editor-section/export-editor-section.service';

@Component({
  selector: 'app-export-editor-typescale',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: [
    {provide: 'tables', useValue: db.typescale},
    ExportEditorSectionService
  ]
})
export class ExportEditorTypescaleComponent implements OnInit {
  constructor(private editorSection: ExportEditorSectionService) {}

  ngOnInit() {
    this.editorSection.getTokenValue = (token: TypescaleDBToken) => `${token.value}px`;
  }
}
