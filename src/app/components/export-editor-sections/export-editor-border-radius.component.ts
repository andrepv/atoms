import { Component, OnInit } from '@angular/core';
import borderRadiusSectionProviders from '@borders/border-radius-section/border-radius-section-providers';

@Component({
  selector: 'app-export-editor-border-radius',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: borderRadiusSectionProviders
})
export class ExportEditorBorderRadiusComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
