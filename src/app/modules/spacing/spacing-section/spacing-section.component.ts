import { Component, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { getScaleValue } from '@utils';
import { SpacingGroupModel, SpacingTokenModel, SPACING_DB_DATA } from '@spacing/spacing.model';
import { provideSectionDeps } from '@utils/provide-section-deps';
import { DEFAULT_SCALE_BASE } from '@shared/components/modular-scale-editor/modular-scale-editor.model';

@Component({
  selector: 'app-spacing-section',
  templateUrl: './spacing-section.component.html',
  styleUrls: ['./spacing-section.component.less'],
  providers: [...provideSectionDeps(SPACING_DB_DATA.tableGroupName)]
})
export class SpacingSectionComponent implements OnInit {
  readonly MIN_VALUE = 1;
  readonly MAX_VALUE = 150;

  get sectionName() {
    return this.section.sectionName;
  }

  constructor(public section: SectionContentManagerService<SpacingTokenModel, SpacingGroupModel>) {}

  ngOnInit() {
    this.section.configure({
      contentManagerConfigs: {
        getDefaultTokenValue: groupId => this.getDefaultTokenValue(groupId),
        getDefaultGroupState: () => ({scale: false})
      },
      sectionViewConfigs: {
        isTokenEditable: false,
        isGroupEditable: true,
      }
    })
  }

  private getDefaultTokenValue(groupId: number) {
    const group = this.section.getGroup(groupId);
    if (group.state.scale) {
      return getScaleValue(group.tokens.length, group.state.scale);
    }
    return DEFAULT_SCALE_BASE;
  }

}