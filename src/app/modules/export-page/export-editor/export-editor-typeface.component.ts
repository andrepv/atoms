import { Component, OnInit } from '@angular/core';
import { db } from '@core/indexedDB';
import { TypefaceDBToken } from '@typography/typeface-section/typeface.model';
import { ExportEditorSectionService } from '../export-editor-section/export-editor-section.service';
import { ExportEditorService } from './export-editor.service';

@Component({
  selector: 'app-export-editor-typeface',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: [
    {provide: 'tables', useValue: db.typeface},
    ExportEditorSectionService
  ]
})
export class ExportEditorTypefaceComponent implements OnInit {
  constructor(
    private editorSection: ExportEditorSectionService,
    private editor: ExportEditorService,
  ) {}

  ngOnInit() {
    this.editorSection.getTokenValue = (token: TypefaceDBToken) => {
      const quote = this.editor.commonConfigs.format === "js" ? '' : '"';
      return `${quote}${token.family}${quote}`;
    };
  }
}
