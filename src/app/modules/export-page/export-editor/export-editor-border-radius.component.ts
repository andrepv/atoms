import { Component, OnInit } from '@angular/core';
import { db } from '@core/indexedDB';
import { BorderRadiusDBToken } from '../../borders/border-radius-section/border-radius.model';
import { ExportEditorSectionService } from '../export-editor-section/export-editor-section.service';

@Component({
  selector: 'app-export-editor-border-radius',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: [
    {provide: 'tables', useValue: db.borderRadius},
    ExportEditorSectionService
  ]
})
export class ExportEditorBorderRadiusComponent implements OnInit {
  constructor(private editorSection: ExportEditorSectionService) {}

  ngOnInit() {
    this.editorSection.getTokenValue = (token: BorderRadiusDBToken) =>  `${token.radius}px`;
  }
}
