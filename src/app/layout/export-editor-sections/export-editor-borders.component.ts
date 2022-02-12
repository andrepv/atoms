import { Component, OnInit } from '@angular/core';
import bordersSectionProviders from '../../modules/borders/borders-section/borders-section-providers';


@Component({
  selector: 'app-export-editor-borders',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: bordersSectionProviders
})
export class ExportEditorBordersComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
