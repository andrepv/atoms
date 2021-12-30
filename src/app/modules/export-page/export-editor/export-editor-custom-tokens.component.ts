import { Component, Input, OnInit } from '@angular/core';
import { db } from '@core/indexedDB';
import { CustomTokensDBToken } from '../../custom-tokens/custom-tokens.model';
import { ExportEditorSectionService } from '../export-editor-section/export-editor-section.service';

@Component({
  selector: 'app-export-editor-custom-tokens',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: [
    {provide: 'tables', useValue: db.customTokens},
    ExportEditorSectionService
  ]
})
export class ExportEditorCustomTokensComponent implements OnInit {
  constructor(private editorSection: ExportEditorSectionService) {}

  ngOnInit() {
    this.editorSection.getTokenValue = (token: CustomTokensDBToken) => token.value;
  }
}
