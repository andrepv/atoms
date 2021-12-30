import { Component, OnInit } from '@angular/core';
import { db } from '@core/indexedDB';
import { BoxShadowDBToken } from '@shadows/box-shadow-section/box-shadow-section.model';
import { ExportEditorSectionService } from '../export-editor-section/export-editor-section.service';

@Component({
  selector: 'app-export-editor-box-shadow',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: [
    {provide: 'tables', useValue: db.boxShadow},
    ExportEditorSectionService
  ]
})
export class ExportEditorBoxShadowComponent implements OnInit {
  constructor(private editorSection: ExportEditorSectionService) {}

  ngOnInit() {
    this.editorSection.getTokenValue = (token: BoxShadowDBToken) => token.layers.reduce((accumulator, layers, index) => {
      let values = Object.values(layers);
      if (!values[values.length - 1]) values.pop();
      let comma = index + 1 !== token.layers.length ? ',' : '';
      accumulator += values.join(' ');
      return accumulator + comma
    }, "");
  }
}
