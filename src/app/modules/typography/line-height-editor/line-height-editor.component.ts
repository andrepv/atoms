import { Component, OnInit } from '@angular/core';
import { EditorService } from '@core/services/editor.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { LineHeightTokenModel, LineHeightGroupModel, LINEHEIGHT_DB_DATA } from '@typography/line-height/line-height.model';
import { provideEditorDeps } from '@utils/provide-editor-deps';

@Component({
  selector: 'app-line-height-editor',
  templateUrl: './line-height-editor.component.html',
  providers: [...provideEditorDeps(LINEHEIGHT_DB_DATA.tableGroupName)]
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
