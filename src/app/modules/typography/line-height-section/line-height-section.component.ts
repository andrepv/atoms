import { Component, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { TextPreviewService } from '../text-preview/text-preview.service';
import { LineHeightDBToken, LineHeightDBGroup, LINEHEIGHT_DB_DATA } from './line-height.model';
import { provideSectionDeps } from '@utils/provide-section-deps';
import { StoreToken, StoreGroup } from '@core/core.model';

@Component({
  selector: 'app-line-height-section',
  templateUrl: './line-height-section.component.html',
  providers: [...provideSectionDeps(LINEHEIGHT_DB_DATA.tableGroupName)]
})
export class LineHeightSectionComponent implements OnInit {
  constructor(
    private section: SectionContentManagerService<LineHeightDBToken, LineHeightDBGroup>,
    private preview: TextPreviewService,
  ) {
    this.preview.registerStyleSource<LineHeightDBToken>(
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

  setTokenValue(value: LineHeightDBToken['value'], token: StoreToken, group: StoreGroup<LineHeightDBGroup>) {
    this.section.updateToken(token, group, {value});
  }
}
