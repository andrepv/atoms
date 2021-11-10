import { Component, OnInit } from '@angular/core';
import { DEFAULT_BASE } from '@shared/components/modular-scale-editor/modular-scale-editor.component';
import { ContentManagerService } from '@core/services/content-manager.service';
import { db } from '@core/indexedDB';
import { StoreService } from '@core/services/store.service';
import { getScaleValue } from '@utils';
import { TextStylesService } from '../text-styles/text-styles.service';

@Component({
  selector: 'app-typescale',
  templateUrl: './typescale.component.html',
  providers: [
    {provide: 'tables', useValue: db.typescale},
    ContentManagerService,
  ]
})
export class TypescaleComponent implements OnInit {
  readonly MIN_FONT_SIZE = 1;
  readonly MAX_FONT_SIZE = 150;

  get sectionName() {
    return this.contentManager.sectionName;
  }

  constructor(
    public contentManager: ContentManagerService,
    public textPreview: TextStylesService,
    private store: StoreService,
  ) {}
    
  ngOnInit() {
    this.contentManager.configure({
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
    const group = this.store.getGroup(this.sectionName, groupId);
    if (group.state.scale) {  
      return getScaleValue(group.tokens.length, group.state.scale);
    }
    return DEFAULT_BASE;
  }
}
