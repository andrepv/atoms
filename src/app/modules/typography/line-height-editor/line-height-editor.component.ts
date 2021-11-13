import { Component, OnInit } from '@angular/core';
import { EditorService } from '@core/services/editor.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { db } from '@core/indexedDB';
import { LineHeightTokenModel, LineHeightGroupModel } from '@typography/line-height/line-height.model';

@Component({
  selector: 'app-line-height-editor',
  templateUrl: './line-height-editor.component.html',
  providers: [
    {provide: 'tables', useValue: db.lineHeight},
    SectionContentManagerService,
  ]
})
export class LineHeightEditorComponent implements OnInit {
  get textPreviewId() {
    return this.editor.content.group.state.textPreviewId;
  }

  constructor(
    private editor: EditorService<LineHeightTokenModel,
    LineHeightGroupModel>,
    private section: SectionContentManagerService<LineHeightTokenModel,
    LineHeightGroupModel>,
  ) { }

  ngOnInit() {}

  setTextStyles(textPreviewId: number) {
    this.section.setGroupState(
      this.editor.content.group.id,
      {textPreviewId}
    );
  }
}
