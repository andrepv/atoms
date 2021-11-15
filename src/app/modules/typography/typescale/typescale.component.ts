import { Component, OnInit } from '@angular/core';
import { DEFAULT_BASE } from '@shared/components/modular-scale-editor/modular-scale-editor.component';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { getScaleValue } from '@utils';
import { TextStylesService } from '../text-styles/text-styles.service';
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

  get sectionName() {
    return this.section.sectionName;
  }

  constructor(
    public section: SectionContentManagerService<TypescaleTokenModel, TypescaleGroupModel>,
    public textPreview: TextStylesService,
  ) {}
    
  ngOnInit() {
    this.section.configure({
      contentManagerConfigs: {
        getDefaultTokenValue: groupId => this.getDefaultTokenValue(groupId),
        getDefaultGroupState: () => ({textPreviewId: 0, scale: false})
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
