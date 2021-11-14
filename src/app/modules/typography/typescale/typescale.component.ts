import { Component, OnInit } from '@angular/core';
import { DEFAULT_BASE } from '@shared/components/modular-scale-editor/modular-scale-editor.component';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { db } from '@core/indexedDB';
import { getScaleValue } from '@utils';
import { TextStylesService } from '../text-styles/text-styles.service';
import { TypescaleTokenModel, TypescaleGroupModel } from './typescale.model';
import { ClipboardService } from '@core/services/clipboard.service';

@Component({
  selector: 'app-typescale',
  templateUrl: './typescale.component.html',
  providers: [
    {provide: 'tables', useValue: db.typescale},
    SectionContentManagerService,
    ClipboardService,
  ]
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
