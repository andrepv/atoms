import { Component, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { DBGroup } from '@core/core.model';
import { TextStylesTokenModel, TEXTSTYLES_DB_DATA } from './text-styles.model';
import { provideSectionDeps } from '@utils/provide-section-deps';

@Component({
  selector: 'app-text-styles',
  templateUrl: './text-styles.component.html',
  styleUrls: ['./text-styles.component.less'],
  providers: [...provideSectionDeps(TEXTSTYLES_DB_DATA.tableGroupName)]
})
export class TextStylesComponent implements OnInit {
  constructor(private section: SectionContentManagerService<TextStylesTokenModel, DBGroup>) {}

  ngOnInit() {
    this.section.configure({
      contentManagerConfigs: {
        getDefaultTokenValue: () => ({}),
      }
    })
  }
}
