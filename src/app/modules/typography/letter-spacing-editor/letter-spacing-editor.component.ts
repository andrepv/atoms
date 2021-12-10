import { Component, Input, OnInit } from '@angular/core';
import { StoreGroup } from '@core/core.model';
// import { EditorService } from '@core/services/editor.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { LetterSpacingGroupModel, LetterSpacingTokenModel } from '@typography/letter-spacing-section/letter-spacing.model';

@Component({
  selector: 'app-letter-spacing-editor',
  templateUrl: './letter-spacing-editor.component.html',
})
export class LetterSpacingEditorComponent implements OnInit {
  @Input() group: any;

  get textPreviewId() {
    return this.group.textPreviewId;
  }

  constructor(
    private section: SectionContentManagerService,
  ) {}

  ngOnInit() {}

  setTextStyles(textPreviewId: number) {
    this.section.updateGroup(this.group, {textPreviewId})
  }
}
