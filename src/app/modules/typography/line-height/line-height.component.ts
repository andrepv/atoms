import { Component, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { db } from '@core/indexedDB';
import { TextStylesService } from '../text-styles/text-styles.service';
import { LineHeightTokenModel, LineHeightGroupModel } from './line-height.model';
import { ClipboardService } from '@core/services/clipboard.service';

@Component({
  selector: 'app-line-height',
  templateUrl: './line-height.component.html',
  providers: [
    {provide: 'tables', useValue: db.lineHeight},
    SectionContentManagerService,
    ClipboardService,
  ]
})
export class LineHeightComponent implements OnInit {
  constructor(
    private section: SectionContentManagerService<LineHeightTokenModel,
    LineHeightGroupModel>,
    private textPreview: TextStylesService,
  ) {}

  ngOnInit() {
    this.section.configure({
      contentManagerConfigs: {
        getDefaultTokenValue: () => 1,
        getDefaultGroupState: () => ({textPreviewId: 0})
      },
      sectionViewConfigs: {
        isTokenEditable: false,
        isGroupEditable: true,
      }
    })
  }

  getTextStyles(groupId: number) {
    return this.textPreview.getGroupTextStyles(groupId, this.section.sectionName)
  }

  setTokenValue(value: LineHeightTokenModel['value'], tokenId: number, groupId: number) {
    this.section.setTokenValue(value, tokenId, groupId)
  }
}
