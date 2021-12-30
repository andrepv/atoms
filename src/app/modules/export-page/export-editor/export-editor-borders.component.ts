import { Component, OnInit } from '@angular/core';
import { db } from '@core/indexedDB';
import { BorderDBToken } from '../../borders/borders.model';
import { ExportEditorSectionService } from '../export-editor-section/export-editor-section.service';

@Component({
  selector: 'app-export-editor-borders',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: [
    {provide: 'tables', useValue: db.border},
    ExportEditorSectionService
  ]
})
export class ExportEditorBordersComponent implements OnInit {
  constructor(private editorSection: ExportEditorSectionService) {}

  ngOnInit() {
    this.editorSection.getTokenValue = (token: BorderDBToken) => {
      const {width, style, color} = token;
      return `${width}px ${style} ${color}`;
    }
  }
}
