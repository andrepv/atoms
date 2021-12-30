import { Component, OnInit } from '@angular/core';
import { db } from '@core/indexedDB';
import { LetterSpacingDBToken } from '@typography/letter-spacing-section/letter-spacing.model';
import { ExportEditorSectionService } from '../export-editor-section/export-editor-section.service';

@Component({
  selector: 'app-export-editor-letter-spacing',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: [
    {provide: 'tables', useValue: db.letterSpacing},
    ExportEditorSectionService
  ]
})
export class ExportEditorLetterSpacingComponent implements OnInit {
  constructor(private editorSection: ExportEditorSectionService) {}

  ngOnInit() {
    this.editorSection.getTokenValue = (token: LetterSpacingDBToken) => `${token.value}em` 
  }
}
