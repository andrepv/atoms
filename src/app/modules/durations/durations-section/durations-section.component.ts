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
  readonly MIN_VALUE = 1;
  readonly MAX_VALUE = 2500;

  constructor(private section: SectionContentManagerService<DurationsDBToken, DurationsDBGroup>) {}

  ngOnInit() {
    this.section.configure({
      hooks: {
        getDefaultToken: groupId => ({
          value: this.getDefaultTokenValue(groupId)
        }),
        getDefaultGroup: () => ({
          scale: false
        })
      },
    })
  }

  private getDefaultTokenValue(groupId: number) {
    const group = this.section.getGroup(groupId);
    if (group.scale) {
      return getScaleValue(group.tokens.length, group.scale);
    }
    return 140;
  }

  setTokenValue(value: DurationsDBToken['value'], token: StoreToken, group: StoreGroup<DurationsDBGroup>) {
    this.section.updateToken(token, group, {value});
  }
}
