import { Component, OnInit } from '@angular/core';
import { ContentManagerService } from '@core/services/content-manager.service';
import { db } from '@core/indexedDB';
import { StoreService } from '@core/services/store.service';
import { FontManagerService } from '../typeface-editor/font-manager.service';

@Component({
  selector: 'app-typeface',
  templateUrl: './typeface.component.html',
  styleUrls: ['./typeface.component.less'],
  providers: [
    {provide: 'tables', useValue: db.typeface},
    ContentManagerService
  ]
})
export class TypefaceComponent implements OnInit {
  constructor(
    public contentManager: ContentManagerService,
    private store: StoreService,
    private fontManager: FontManagerService,
  ) {}

  ngOnInit() {
    this.contentManager.configure({
      contentManagerConfigs: {
        onLoad: () => this.loadFonts(),
        getDefaultTokenValue: () => ({
          family: 'Arial',
          type: "custom-font",
          data: '',
        })
      }
    })
  }

  private loadFonts() {
    const groupList = this.store.getGroupList(this.contentManager.sectionName);
    for (let group of groupList) {
      const fonts = group.tokens.map(token => token.value);
      this.fontManager.load(fonts);
    }
  }
}
