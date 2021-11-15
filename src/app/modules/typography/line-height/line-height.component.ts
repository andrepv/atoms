import { Component, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { TextStylesService } from '../text-styles/text-styles.service';
import { LineHeightTokenModel, LineHeightGroupModel, LINEHEIGHT_DB_DATA } from './line-height.model';
import { provideSectionDeps } from '@utils/provide-section-deps';

@Component({
  selector: 'app-line-height',
  templateUrl: './line-height.component.html',
  providers: [...provideSectionDeps(LINEHEIGHT_DB_DATA.tableGroupName)]
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
