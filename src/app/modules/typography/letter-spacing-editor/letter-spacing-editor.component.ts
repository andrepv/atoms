import { Component, OnInit } from '@angular/core';
import { EditorService } from '@core/services/editor.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { db } from '@core/indexedDB';
import { LetterSpacingGroupModel, LetterSpacingTokenModel } from '@typography/letter-spacing/letter-spacing.model';

@Component({
  selector: 'app-letter-spacing-editor',
  templateUrl: './letter-spacing-editor.component.html',
  providers: [
    {provide: 'tables', useValue: db.letterSpacing},
    SectionContentManagerService,
  ]
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
