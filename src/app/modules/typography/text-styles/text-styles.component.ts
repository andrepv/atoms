import { Component, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { db } from '@core/indexedDB';
import { DBGroup } from '@core/core.model';
import { TextStylesTokenModel } from './text-styles.model';
import { ClipboardService } from '@core/services/clipboard.service';

@Component({
  selector: 'app-text-styles',
  templateUrl: './text-styles.component.html',
  styleUrls: ['./text-styles.component.less'],
  providers: [
    {provide: 'tables', useValue: db.textStyles},
    SectionContentManagerService,
    ClipboardService,
  ]
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
