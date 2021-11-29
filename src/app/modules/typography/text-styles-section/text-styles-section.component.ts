import { Component, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { DBGroup } from '@core/core.model';
import { TextStylesTokenModel, TEXTSTYLES_DB_DATA } from './text-styles.model';
import { provideSectionDeps } from '@utils/provide-section-deps';
import { TextPreviewService } from '../text-preview/text-preview.service';

@Component({
  selector: 'app-text-styles-section',
  templateUrl: './text-styles-section.component.html',
  styleUrls: ['./text-styles-section.component.less'],
  providers: [...provideSectionDeps(TEXTSTYLES_DB_DATA.tableGroupName)]
})
export class TextStylesSectionComponent implements OnInit {
  constructor(
    private section: SectionContentManagerService<TextStylesTokenModel, DBGroup>,
    private preview: TextPreviewService
  ) {}

  ngOnInit() {
    this.section.configure({
      contentManagerConfigs: {
        getDefaultTokenValue: () => ({}),
        onTokenDelete: token => this.preview.deletePreview(token.id)
      }
    })
  }
}