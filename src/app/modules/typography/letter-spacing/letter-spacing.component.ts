import { Component, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { TextPreviewService } from '../text-preview/text-preview.service';
import { LetterSpacingGroupModel, LetterSpacingTokenModel, LETTERSPACING_DB_DATA } from './letter-spacing.model';
import { provideSectionDeps } from '@utils/provide-section-deps';

@Component({
  selector: 'app-letter-spacing',
  templateUrl: './letter-spacing.component.html',
  providers: [...provideSectionDeps(LETTERSPACING_DB_DATA.tableGroupName)]
})
export class LetterSpacingComponent implements OnInit {
  constructor(
    private section: SectionContentManagerService<LetterSpacingTokenModel, LetterSpacingGroupModel>,
    private preview: TextPreviewService,
  ) {
    this.preview.registerStyleSource<LetterSpacingTokenModel>(
      'letterSpacing',
      {
        getValue: value => `${value}em`,
        section: this.section.sectionName
      }
    )
  }

  ngOnInit() {
    this.section.configure({
      contentManagerConfigs: {
        getDefaultTokenValue: () => 0.01,
        getDefaultGroupState: () => ({textPreviewId: 0}),
        onLoad: () => {
          this.preview.isStyleSourceLoaded$.next(true);
        },
        onTokenValueChange: (value, token) => {
          this.preview.setPreviewStyleValue(
            {'letterSpacing': `${value}em`},
            token.id
          )
        },
        onTokenDelete: token => {
          this.preview.deletePreviewStyle('letterSpacing', token.id)
        }
      },
      sectionViewConfigs: {
        isTokenEditable: false,
        isGroupEditable: true,
      }
    })
  }

  setTokenValue(
    value: LetterSpacingTokenModel['value'],
    tokenId: number,
    groupId: number
  ) {
    this.section.setTokenValue(value, tokenId, groupId)
  }
}
