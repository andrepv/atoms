import { Component, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { TextStylesService } from '../text-styles/text-styles.service';
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
    private textPreview: TextStylesService,
  ) {}

  ngOnInit() {
    this.section.configure({
      contentManagerConfigs: {
        getDefaultTokenValue: () => 0.01,
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

  setTokenValue(value: LetterSpacingTokenModel['value'], tokenId: number, groupId: number) {
    this.section.setTokenValue(value, tokenId, groupId)
  }
}
