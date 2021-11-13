import { Component, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { db } from '@core/indexedDB';
import { FontManagerService } from '../typeface-editor/font-manager.service';
import { DBGroup } from '@core/core.model';
import { TypefaceTokenModel } from './typeface.model';

@Component({
  selector: 'app-typeface',
  templateUrl: './typeface.component.html',
  styleUrls: ['./typeface.component.less'],
  providers: [
    {provide: 'tables', useValue: db.typeface},
    SectionContentManagerService
  ]
})
export class TypefaceComponent implements OnInit {
  constructor(
    private section: SectionContentManagerService<TypefaceTokenModel, DBGroup>,
    private fontManager: FontManagerService,
  ) {}

  ngOnInit() {
    this.section.configure({
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
    const groupList = this.section.getGroupList();
    for (let group of groupList) {
      const fonts = group.tokens.map(token => token.value);
      this.fontManager.load(fonts);
    }
  }
}
