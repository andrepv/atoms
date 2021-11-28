import { Component, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { getScaleValue } from '@utils/get-type-scale-value';
import { provideSectionDeps } from '@utils/provide-section-deps';
import { DurationsGroupModel, DurationsTokenModel, DURATIONS_DB_DATA } from '../durations.model';

@Component({
  selector: 'app-durations-section',
  templateUrl: './durations-section.component.html',
  styleUrls: ['./durations-section.component.less'],
  providers: [...provideSectionDeps(DURATIONS_DB_DATA.tableGroupName)]
})
export class DurationsSectionComponent implements OnInit {
  readonly MIN_VALUE = 1;
  readonly MAX_VALUE = 2500;

  constructor(private section: SectionContentManagerService<DurationsTokenModel, DurationsGroupModel>) { }

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
    return 140;
  }

  setTokenValue(value: DurationsTokenModel['value'], tokenId: number, groupId: number) {
    this.section.setTokenValue(value, tokenId, groupId)
  }

}
