import { Component, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { FontManagerService } from '../typeface-editor/font-manager.service';
import { DBGroup } from '@core/core.model';
import { TypefaceDBToken, TYPEFACE_DB_DATA } from './typeface.model';
import { provideSectionDeps } from '@utils/provide-section-deps';
import { TextPreviewService } from '@typography/text-preview/text-preview.service';

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
    private preview: TextPreviewService,
  ) {
    this.preview.registerStyleSource<any>(
      'fontFamily',
      {
        getValue: token => token.family,
        section: this.section.sectionName
      }
    )
  }

  ngOnInit() {
    this.section.configure({
      hooks: {
        onLoad: () => {
          this.preview.isStyleSourceLoaded$.next(true);
          this.loadFonts()
        },
        onTokenDelete: token => {
          this.preview.deletePreviewStyle('fontFamily', token.id)
        },
        onTokenUpdate: ({family}, token) => {
          this.preview.setPreviewStyleValue(
            {fontFamily: family},
            token.id
          )
        },
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
