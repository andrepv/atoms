import { Component, OnInit } from '@angular/core';
import { ContentManagerService } from '@core/services/content-manager.service';
import { db } from '@core/indexedDB';
import { TextStylesService } from '../text-styles/text-styles.service';

@Component({
  selector: 'app-line-height',
  templateUrl: './line-height.component.html',
  providers: [
    {provide: 'tables', useValue: db.lineHeight},
    ContentManagerService,
  ]
})
export class LineHeightComponent implements OnInit {
  get sectionName() {
    return this.contentManager.sectionName;
  }

  constructor(
    public contentManager: ContentManagerService,
    public textPreview: TextStylesService,
  ) {}

  ngOnInit() {
    this.contentManager.configure({
      contentManagerConfigs: {
        getDefaultTokenValue: () => 1,
        getDefaultGroupState: () => ({textPreviewId: 0})
      },
      sectionViewConfigs: {
        isTokenEditable: false,
        isGroupEditable: true,
      }
    })
  }

}
