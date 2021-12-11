import { Component, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { getScaleValue } from '@utils';
import { TextPreviewService } from '../text-preview/text-preview.service';
import { TypescaleDBToken, TypescaleDBGroup, TYPESCALE_DB_DATA } from './typescale.model';
import { provideSectionDeps } from '@utils/provide-section-deps';
import { DEFAULT_SCALE_BASE } from '@shared/components/modular-scale-editor/modular-scale-editor.model';
import { StoreToken, StoreGroup } from '@core/core.model';

@Component({
  selector: 'app-typescale-section',
  templateUrl: './typescale-section.component.html',
  providers: [...provideSectionDeps(TYPESCALE_DB_DATA.tableGroupName)]
})
export class TypescaleSectionComponent implements OnInit {
  readonly MIN_FONT_SIZE = 1;
  readonly MAX_FONT_SIZE = 150;

  constructor(
    public section: SectionContentManagerService<TypescaleDBToken,TypescaleDBGroup>,
    public preview: TextPreviewService,
  ) {
    this.preview.registerStyleSource<TypescaleDBToken>(
      'fontSize',
      {
        getValue: token => `${token.value}px`,
        section: this.section.sectionName
      }
    )
  }

  ngOnInit() {
    this.section.configure({
      hooks: {
        getDefaultToken: groupId => ({
          value: this.getDefaultTokenValue(groupId)
        }),
        getDefaultGroup: () => ({
          textPreviewId: 0,
          scale: false
        }),
        onLoad: () => {
          this.preview.isStyleSourceLoaded$.next(true);
        },
        onTokenUpdate: ({value}, token) => {
          this.preview.setPreviewStyleValue(
            {fontSize: `${value}px`},
            token.id
          )
        },
        onTokenDelete: token => {
          this.preview.deletePreviewStyle('fontSize', token.id)
        }
      },
    })
  }

  private getDefaultTokenValue(groupId: number) {
    const group = this.section.getGroup(groupId);
    if (group.scale) {  
      return getScaleValue(group.tokens.length, group.scale);
    }
    return DEFAULT_SCALE_BASE;
  }

  setTokenValue(value: number, token: StoreToken, group: StoreGroup<TypescaleDBGroup>) {
    this.section.updateToken(token, group, {value});
  }
}
