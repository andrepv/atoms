import { Component, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { FontManagerService } from '../typeface-editor/font-manager.service';
import { DBGroup } from '@core/core.model';
import { TypefaceTokenModel, TYPEFACE_DB_DATA } from './typeface.model';
import { provideSectionDeps } from '@utils/provide-section-deps';

@Component({
  selector: 'app-typeface',
  templateUrl: './typeface.component.html',
  styleUrls: ['./typeface.component.less'],
  providers: [...provideSectionDeps(TYPEFACE_DB_DATA.tableGroupName)]
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
