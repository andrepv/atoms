import { Component, OnInit } from '@angular/core';
import { SPACING_DB_DATA } from '@spacing/spacing.model';
import { provideEditorDeps } from '@utils/provide-editor-deps';

@Component({
  selector: 'app-spacing-editor',
  template: `<app-modular-scale-editor></app-modular-scale-editor>`,
  styleUrls: ['./spacing-editor.component.less'],
  providers: [...provideEditorDeps(SPACING_DB_DATA.tableGroupName)]
})
export class SpacingEditorComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
