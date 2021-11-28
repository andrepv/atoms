import { Component, OnInit } from '@angular/core';
import { EditorService } from '@core/services/editor.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { LetterSpacingGroupModel, LetterSpacingTokenModel, LETTERSPACING_DB_DATA } from '@typography/letter-spacing-section/letter-spacing.model';
import { provideEditorDeps } from '@utils/provide-editor-deps';

@Component({
  selector: 'app-letter-spacing-editor',
  templateUrl: './letter-spacing-editor.component.html',
  providers: [...provideEditorDeps(LETTERSPACING_DB_DATA.tableGroupName)]
})
export class LetterSpacingEditorComponent implements OnInit {
  get textPreviewId() {
    return this.editor.content.group.state.textPreviewId;
  }

  constructor(
    private editor: EditorService<LetterSpacingTokenModel, LetterSpacingGroupModel>,
    private section: SectionContentManagerService<LetterSpacingTokenModel, LetterSpacingGroupModel>,
  ) {}

  ngOnInit() {}

  setTextStyles(textPreviewId: number) {
    this.section.setGroupState(
      this.editor.content.group.id,
      {textPreviewId}
    );
  }
}
