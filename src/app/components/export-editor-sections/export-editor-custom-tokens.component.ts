import { Component, OnInit } from '@angular/core';
import customTokensSectionProviders from '@custom-tokens/custom-tokens-section/custom-tokens-section-providers';

@Component({
  selector: 'app-export-editor-custom-tokens',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: customTokensSectionProviders
})
export class ExportEditorCustomTokensComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
