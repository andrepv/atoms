import { Component, OnInit } from '@angular/core';
import { EditorService } from '../../layout/editor/editor.service';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';

@Component({
  selector: 'app-line-height-editor',
  template: `
    <app-section-tokens-select
      section="Text Styles"
      [selectedTokenId]="editableGroup.state.textPreviewId"
      (change)="setTextStyles($event)"
    ></app-section-tokens-select>
  `,
  providers: [
    {provide: 'tables', useValue: db.lineHeight},
    ContentManagerService,
  ]
})
export class LineHeightEditorComponent implements OnInit {
  get editableGroup() {
    return this.editor.content.group;
  }

  constructor(
    public editor: EditorService,
    public contentManager: ContentManagerService,
  ) { }

  ngOnInit() {}

  setTextStyles(textPreviewId: number) {
    this.contentManager.setGroupState(this.editableGroup.id, {textPreviewId});
  }
}
