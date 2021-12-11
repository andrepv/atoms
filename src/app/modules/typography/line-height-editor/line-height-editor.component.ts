import { Component, Input, OnInit } from '@angular/core';
import { StoreGroup } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { LineHeightDBToken, LineHeightDBGroup } from '@typography/line-height-section/line-height.model';

@Component({
  selector: 'app-line-height-editor',
  templateUrl: './line-height-editor.component.html',
})
export class LineHeightEditorComponent implements OnInit {
  @Input() group: StoreGroup<LineHeightDBGroup, LineHeightDBToken>;

  get textPreviewId() {
    return this.group.textPreviewId;
  }

  constructor(private section: SectionContentManagerService<LineHeightDBToken,
    LineHeightDBGroup>) {}

  ngOnInit() {}

  async setTextStyles(textPreviewId: number) {
    await this.section.updateGroup(this.group, {textPreviewId})
  }
}
