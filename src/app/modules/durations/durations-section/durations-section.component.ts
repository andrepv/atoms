import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { StoreGroup, StoreToken } from '@core/core.model';
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

  constructor(private section: SectionContentManagerService) {}

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
    const group: any = this.section.getGroup(groupId);
    if (group.scale) {
      return getScaleValue(group.tokens.length, group.scale);
    }
    return 140;
  }

  setTokenValue(value: DurationsTokenModel['value'], token: StoreToken, group: StoreGroup) {
    this.section.updateToken(token, group, {value});
  }
}
