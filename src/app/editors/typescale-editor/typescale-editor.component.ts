import { Component, OnInit } from '@angular/core';
import { EditorService } from '../../layout/editor/editor.service';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';

@Component({
  selector: 'app-typescale-editor',
  template:  `
    <app-modular-scale-editor></app-modular-scale-editor>

    <app-tokens-section-select
      section="Text Styles"
      [selectedTokenId]="editableGroup.state.textPreviewId"
      (change)="contentManager.setGroupState(this.editableGroup.id, {textPreviewId: $event})"
    ></app-tokens-section-select>
  `,
  styleUrls: ['./typescale-editor.component.less'],
  providers: [
    {provide: 'tables', useValue: db.typescale},
    ContentManagerService,
  ]
})
export class TypescaleEditorComponent implements OnInit {
  get editableGroup() {
    return this.editor.content.group;
  }

  constructor(
    public editor: EditorService,
    public contentManager: ContentManagerService,
  ) {}

  ngOnInit() {}
}
