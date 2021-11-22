import { Component, OnInit } from '@angular/core';
import { DEFAULT_BASE } from '@shared/components/modular-scale-editor/modular-scale-editor.component';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { getScaleValue } from '@utils';
import { TextPreviewService } from '../text-preview/text-preview.service';
import { TypescaleTokenModel, TypescaleGroupModel, TYPESCALE_DB_DATA } from './typescale.model';
import { provideSectionDeps } from '@utils/provide-section-deps';

@Component({
  selector: 'app-typescale',
  templateUrl: './typescale.component.html',
  providers: [...provideSectionDeps(TYPESCALE_DB_DATA.tableGroupName)]
})
export class TypescaleComponent implements OnInit {
  readonly MIN_FONT_SIZE = 1;
  readonly MAX_FONT_SIZE = 150;

  constructor(
    public section: SectionContentManagerService<TypescaleTokenModel, TypescaleGroupModel>,
    public preview: TextPreviewService,
  ) {
    this.preview.registerStyleSource<TypescaleTokenModel>(
      'fontSize',
      {
        getValue: value => `${value}px`,
        section: this.section.sectionName
      }
    )
  }
    
  ngOnInit() {
    this.section.configure({
      contentManagerConfigs: {
        getDefaultTokenValue: groupId => this.getDefaultTokenValue(groupId),
        getDefaultGroupState: () => ({textPreviewId: 0, scale: false}),
        onLoad: () => {
          this.preview.isStyleSourceLoaded$.next(true);
        },
        onTokenValueChange: (value, token) => {
          this.preview.setPreviewStyleValue(
            {fontSize: `${value}px`},
            token.id
          )
        },
        onTokenDelete: token => {
          this.preview.deletePreviewStyle('fontSize', token.id)
        }
      },
      sectionViewConfigs: {
        isTokenEditable: false,
        isGroupEditable: true,
      }
    })
  }

  private getDefaultTokenValue(groupId: number) {
    const group = this.section.getGroup(groupId);
    if (group.state.scale) {  
      return getScaleValue(group.tokens.length, group.state.scale);
    }
    return DEFAULT_BASE;
  }
}
