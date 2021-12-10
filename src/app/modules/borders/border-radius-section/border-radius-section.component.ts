import { Component, OnInit } from '@angular/core';
import { DBGroup, StoreGroup, StoreToken } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { provideSectionDeps } from '@utils/provide-section-deps';
import { BorderRadiusTokenModel, BORDER_RADIUS_DB_DATA } from './border-radius.model';

@Component({
  selector: 'app-border-radius-section',
  templateUrl: './border-radius-section.component.html',
  styleUrls: ['./border-radius-section.component.less'],
  providers: [...provideSectionDeps(BORDER_RADIUS_DB_DATA.tableGroupName)]
})
export class BorderRadiusSectionComponent implements OnInit {

  constructor(private section: SectionContentManagerService) {}

  ngOnInit() {
    this.section.configure({
      hooks: {
        getDefaultToken: () => ({
          radius: 0,
        })
      },
    })
  }

  setTokenValue(
    radius: BorderRadiusTokenModel['value'],
    token: StoreToken,
    group: StoreGroup
  ) {
    this.section.updateToken(token, group, {radius});
  }
}
