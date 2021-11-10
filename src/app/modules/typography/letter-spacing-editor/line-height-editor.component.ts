import { Component, OnInit } from '@angular/core';
import { EditorService } from '@core/services/editor.service';
import { ContentManagerService } from '@core/services/content-manager.service';
import { db } from '@core/indexedDB';

@Component({
  selector: 'app-letter-spacing-editor',
  templateUrl: './line-height-editor.component.html',
  providers: [
    {provide: 'tables', useValue: db.letterSpacing},
    ContentManagerService,
  ]
})
export class LetterSpacingEditorComponent implements OnInit {
  get editableGroup() {
    return this.editor.content.group;
  }

  constructor(
    public editor: EditorService,
    public contentManager: ContentManagerService,
  ) {}

  ngOnInit() {}

  setTextStyles(textPreviewId: number) {
    this.contentManager.setGroupState(this.editableGroup.id, {textPreviewId});
  }
}
