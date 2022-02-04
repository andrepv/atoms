import { Component, OnInit } from '@angular/core';
import bordersSectionProviders from '../../borders/borders-section/borders-section-providers';
import { ExportEditorSectionService } from '../export-editor-section/export-editor-section.service';

@Component({
  selector: 'app-export-editor-borders',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: [
    ...bordersSectionProviders,
    ExportEditorSectionService
  ]
})
export class ExportEditorBordersComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
