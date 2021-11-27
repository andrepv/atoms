import { Component, OnInit } from '@angular/core';
import { DBGroup } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { provideSectionDeps } from '@utils/provide-section-deps';
import { BorderRadiusTokenModel, BORDER_RADIUS_DB_DATA } from './border-radius.model';

@Component({
  selector: 'app-border-radius',
  templateUrl: './border-radius.component.html',
  styleUrls: ['./border-radius.component.less'],
  providers: [...provideSectionDeps(BORDER_RADIUS_DB_DATA.tableGroupName)]
})
export class BorderRadiusComponent implements OnInit {

  constructor(private section: SectionContentManagerService<BorderRadiusTokenModel, DBGroup>) {}

  ngOnInit() {
    this.section.configure({
      contentManagerConfigs: {
        getDefaultTokenValue: () => 0,
      },
      sectionViewConfigs: {
        isTokenEditable: false,
        isGroupEditable: false,
      }
    })
  }

  setTokenValue(
    value: BorderRadiusTokenModel['value'],
    tokenId: number,
    groupId: number
  ) {
    this.section.setTokenValue(value, tokenId, groupId)
  }
}
