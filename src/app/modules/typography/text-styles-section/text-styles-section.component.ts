import { Component, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { TextStylesDBGroup, TextStylesDBToken, TEXTSTYLES_DB_DATA } from './text-styles.model';
import { provideSectionDeps } from '@utils/provide-section-deps';
import { getScaleValue } from '@utils/get-type-scale-value';

const defaultText = 'Quick brown fox jumped over the lazy red dog'

@Component({
  selector: 'app-text-styles-section',
  templateUrl: './text-styles-section.component.html',
  styleUrls: ['./text-styles-section.component.less'],
  providers: [...provideSectionDeps(TEXTSTYLES_DB_DATA.tableGroupName)]
})
export class TextStylesSectionComponent implements OnInit {
  constructor(private section: SectionContentManagerService<TextStylesDBToken, TextStylesDBGroup>) {}

  ngOnInit() {
    this.section.configure({
      hooks: {
        getDefaultToken: groupId => ({
          text: defaultText,
          backgroundColor: '#35343d',
          color: '#e3e3e3',

          typefaceId: 0,
          letterSpacing: 0.01,
          lineHeight: 1,
          wordSpacing: 0,
          fontWeight: '400',
          textDecoration: 'none',
          fontStyle: 'normal',
          modularScaleTokenValue: this.getDefaultScaleValue(groupId),
          modularScaleTokenIsLocked: false,
        }),
        getDefaultGroup: () => ({
          scaleBase: 16,
          scaleRatio: 1.067,
        }),
      }
    })
  }

  private getDefaultScaleValue(groupId: number) {
    const group = this.section.getGroup(groupId);
    return getScaleValue(group.tokens.length, group.scaleRatio, group.scaleBase);
  }
}
