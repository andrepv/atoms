import { Component, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { TextPreviewService } from '../text-preview/text-preview.service';
import { LineHeightTokenModel, LineHeightGroupModel, LINEHEIGHT_DB_DATA } from './line-height.model';
import { provideSectionDeps } from '@utils/provide-section-deps';

@Component({
  selector: 'app-line-height-section',
  templateUrl: './line-height-section.component.html',
  providers: [...provideSectionDeps(LINEHEIGHT_DB_DATA.tableGroupName)]
})
export class LineHeightSectionComponent implements OnInit {
  constructor(
    private section: SectionContentManagerService<LineHeightTokenModel,
    LineHeightGroupModel>,
    private preview: TextPreviewService,
  ) {
    this.preview.registerStyleSource<LineHeightTokenModel>(
      'lineHeight',
      {
        getValue: value => value,
        section: this.section.sectionName
      }
    )
  }

  ngOnInit() {
    this.section.configure({
      contentManagerConfigs: {
        getDefaultTokenValue: () => 1,
        getDefaultGroupState: () => ({textPreviewId: 0}),
        onLoad: () => {
          this.preview.isStyleSourceLoaded$.next(true)
        },
        onTokenValueChange: (value, token) => {
          this.preview.setPreviewStyleValue({lineHeight: value}, token.id)
        },
        onTokenDelete: token => {
          this.preview.deletePreviewStyle('lineHeight', token.id)
        }
      },
      sectionViewConfigs: {
        isTokenEditable: false,
        isGroupEditable: true,
      }
    })
  }

  setTokenValue(value: LineHeightTokenModel['value'], tokenId: number, groupId: number) {
    this.section.setTokenValue(value, tokenId, groupId)
  }
}
