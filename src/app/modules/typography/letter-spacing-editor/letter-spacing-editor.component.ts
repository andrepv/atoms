import { Component, Input, OnInit } from '@angular/core';
import { StoreGroup } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { LetterSpacingDBGroup, LetterSpacingDBToken } from '@typography/letter-spacing-section/letter-spacing.model';

@Component({
  selector: 'app-letter-spacing-editor',
  templateUrl: './letter-spacing-editor.component.html',
})
export class LetterSpacingEditorComponent implements OnInit {
  @Input() group: StoreGroup<LetterSpacingDBGroup, LetterSpacingDBToken>;

  get textPreviewId() {
    return this.group.textPreviewId;
  }

  constructor(private section: SectionContentManagerService<LetterSpacingDBToken, LetterSpacingDBGroup>) {}

  ngOnInit() {}

  setTextStyles(textPreviewId: number) {
    this.section.updateGroup(this.group, {textPreviewId})
  }
}
