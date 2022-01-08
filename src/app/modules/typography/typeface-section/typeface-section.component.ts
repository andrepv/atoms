import { Component, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { FontManagerService } from '../typeface-editor/font-manager.service';
import { DBGroup } from '@core/core.model';
import { TypefaceDBToken, TYPEFACE_DB_DATA } from './typeface.model';
import { provideSectionDeps } from '@utils/provide-section-deps';

@Component({
  selector: 'app-typeface-section',
  templateUrl: './typeface-section.component.html',
  styleUrls: ['./typeface-section.component.less'],
  providers: [...provideSectionDeps(TYPEFACE_DB_DATA.tableGroupName)]
})
export class TypefaceSectionComponent implements OnInit {
  constructor(
    private section: SectionContentManagerService<TypefaceDBToken, DBGroup>,
    private fontManager: FontManagerService,
  ) {}

  ngOnInit() {
    this.section.configure({
      hooks: {
        onLoad: () => this.loadFonts(),
        getDefaultToken: () => ({
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
      this.fontManager.load(group.tokens);
    }
  }
}
