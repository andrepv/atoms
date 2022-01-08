import { Component, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { getScaleValue } from '@utils';
import { SpacingDBGroup, SpacingDBToken, SPACING_DB_DATA } from '@spacing/spacing.model';
import { provideSectionDeps } from '@utils/provide-section-deps';
import { StoreToken, StoreGroup } from '@core/core.model';

@Component({
  selector: 'app-spacing-section',
  templateUrl: './spacing-section.component.html',
  styleUrls: ['./spacing-section.component.less'],
  providers: [...provideSectionDeps(SPACING_DB_DATA.tableGroupName)]
})
export class SpacingSectionComponent implements OnInit {
  get sectionName() {
    return this.section.sectionName;
  }

  constructor(private section: SectionContentManagerService<SpacingDBToken, SpacingDBGroup>) {}

  ngOnInit() {
    this.section.configure({
      hooks: {
        getDefaultToken: groupId => ({
          modularScaleTokenValue: this.getDefaultTokenValue(groupId),
          modularScaleTokenIsLocked: false,
        }),
        getDefaultGroup: () => ({
          scaleBase: 16,
          scaleRatio: 1.067,
        }),
      },
    })
  }

  private getDefaultTokenValue(groupId: number) {
    const group = this.section.getGroup(groupId);
    return getScaleValue(group.tokens.length, group.scaleRatio, group.scaleBase);
  }

  setTokenValue(value: SpacingDBToken['modularScaleTokenValue'], token: StoreToken, group: StoreGroup<SpacingDBGroup>) {
    this.section.updateToken(token, group, {modularScaleTokenValue: value});
  }
}
