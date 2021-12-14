import { Component, OnInit } from '@angular/core';
import { DBGroup } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { provideSectionDeps } from '@utils/provide-section-deps';
import { CustomTokensDBToken, CUSTOM_TOKENS_DB_DATA } from '../custom-tokens.model';

@Component({
  selector: 'app-custom-tokens-section',
  templateUrl: './custom-tokens-section.component.html',
  styleUrls: ['./custom-tokens-section.component.less'],
  providers: [...provideSectionDeps(CUSTOM_TOKENS_DB_DATA.tableGroupName)]
})
export class CustomTokensSectionComponent implements OnInit {

  constructor(private section: SectionContentManagerService<CustomTokensDBToken, DBGroup>) { }

  ngOnInit() {
    this.section.configure({
      hooks: {
        getDefaultToken: () => ({
          value: 'empty'
        })
      },
    })
  }

}
