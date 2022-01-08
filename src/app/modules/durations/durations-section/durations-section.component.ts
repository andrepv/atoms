import { Component, OnInit } from '@angular/core';
import { StoreGroup, StoreToken } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { getScaleValue } from '@utils/get-type-scale-value';
import { provideSectionDeps } from '@utils/provide-section-deps';
import { DurationsDBGroup, DurationsDBToken, DURATIONS_DB_DATA } from '../durations.model';

@Component({
  selector: 'app-durations-section',
  templateUrl: './durations-section.component.html',
  styleUrls: ['./durations-section.component.less'],
  providers: [...provideSectionDeps(DURATIONS_DB_DATA.tableGroupName)]
})
export class DurationsSectionComponent implements OnInit {
  constructor(private section: SectionContentManagerService<DurationsDBToken, DurationsDBGroup>) {}

  ngOnInit() {
    this.section.configure({
      hooks: {
        getDefaultToken: groupId => ({
          modularScaleTokenValue: this.getDefaultTokenValue(groupId),
          modularScaleTokenIsLocked: false,
        }),
        getDefaultGroup: () => ({
          textPreviewId: 0,
          scaleBase: 140,
          scaleRatio: 1.067,
        }),
      },
    })
  }

  private getDefaultTokenValue(groupId: number) {
    const group = this.section.getGroup(groupId);
    return getScaleValue(group.tokens.length, group.scaleRatio, group.scaleBase);
  }

  setTokenValue(value: DurationsDBToken['modularScaleTokenValue'], token: StoreToken, group: StoreGroup<DurationsDBGroup>) {
    this.section.updateToken(token, group, {modularScaleTokenValue: value});
  }
}
