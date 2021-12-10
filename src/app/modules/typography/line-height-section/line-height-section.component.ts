import { Component, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { TextPreviewService } from '../text-preview/text-preview.service';
import { LineHeightTokenModel, LineHeightGroupModel, LINEHEIGHT_DB_DATA } from './line-height.model';
import { provideSectionDeps } from '@utils/provide-section-deps';
import { StoreToken, StoreGroup } from '@core/core.model';

@Component({
  selector: 'app-line-height-section',
  templateUrl: './line-height-section.component.html',
  providers: [...provideSectionDeps(LINEHEIGHT_DB_DATA.tableGroupName)]
})
export class LineHeightSectionComponent implements OnInit {
  constructor(
    private section: SectionContentManagerService,
    private preview: TextPreviewService,
  ) {
    this.preview.registerStyleSource<LineHeightTokenModel>(
      'lineHeight',
      {
        getValue: token => token.value,
        section: this.section.sectionName
      }
    )
  }

  ngOnInit() {
    this.section.configure({
      hooks: {
        getDefaultToken: () => ({
          value: 1
        }),
        getDefaultGroup: () => ({
          textPreviewId: 0
        }),
        onLoad: () => {
          this.preview.isStyleSourceLoaded$.next(true)
        },
        onTokenUpdate: ({value}, token) => {
          this.preview.setPreviewStyleValue({lineHeight: value}, token.id)
        },
        onTokenDelete: token => {
          this.preview.deletePreviewStyle('lineHeight', token.id)
        }
      },
    })
  }

  setTokenValue(value: LineHeightTokenModel['value'], token: StoreToken, group: StoreGroup) {
    this.section.updateToken(token, group, {value});
  }
}
