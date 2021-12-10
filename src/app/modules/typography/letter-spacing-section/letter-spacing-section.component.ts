import { Component, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { TextPreviewService } from '../text-preview/text-preview.service';
import { LetterSpacingGroupModel, LetterSpacingTokenModel, LETTERSPACING_DB_DATA } from './letter-spacing.model';
import { provideSectionDeps } from '@utils/provide-section-deps';
import { StoreGroup, StoreToken } from '@core/core.model';

@Component({
  selector: 'app-letter-spacing-section',
  templateUrl: './letter-spacing-section.component.html',
  providers: [...provideSectionDeps(LETTERSPACING_DB_DATA.tableGroupName)]
})
export class LetterSpacingSectionComponent implements OnInit {
  constructor(
    private section: SectionContentManagerService,
    private preview: TextPreviewService,
  ) {
    this.preview.registerStyleSource<LetterSpacingTokenModel>(
      'letterSpacing',
      {
        getValue: token => `${token.value}em`,
        section: this.section.sectionName
      }
    )
  }

  ngOnInit() {
    this.section.configure({
      hooks: {
        getDefaultToken: () => ({
          value: 0.01
        }),
        getDefaultGroup: () => ({
          textPreviewId: 0
        }),
        onLoad: () => {
          this.preview.isStyleSourceLoaded$.next(true);
        },
        onTokenUpdate: ({value}, token) => {
          this.preview.setPreviewStyleValue(
            {'letterSpacing': `${value}em`},
            token.id
          )
        },
        onTokenDelete: token => {
          this.preview.deletePreviewStyle('letterSpacing', token.id)
        }
      },
    })
  }

  setTokenValue(
    value: LetterSpacingTokenModel['value'],
    token: StoreToken,
    group: StoreGroup
  ) {
    this.section.updateToken(token, group, {value});
  }
}
