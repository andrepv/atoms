import { Component, OnInit } from '@angular/core';
import { DEFAULT_BASE_FONT_SIZE } from '../../editors/typescale-editor/typescale-editor.component';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';
import { StoreService } from '../../services/store.service';
import { getScaleValue } from '../../utils/get-type-scale-value';
import { TextStylesService } from '../text-styles/text-styles.service';

@Component({
  selector: 'app-typescale',
  template: `
  <app-groups
    [tokenTemplate]="tokenTemplateRef"
    [isTokenEditable]="false"
    [isGroupEditable]="true"
    layout="list"
  >
    <ng-template #tokenTemplateRef let-token let-group="group">
      <app-editable-token
        [isEditable]="!group.state.scale"
        [minValue]="MIN_FONT_SIZE"
        [maxValue]="MAX_FONT_SIZE"
        [value]="token.value"
        [previewTemplate]="tokenPreviewRef"
        (onAfterChange)="contentManager.setTokenValue($event, token.id, group.id)"
      >
        <ng-template #tokenPreviewRef let-value>
          <app-text-preview
            [data]="textPreview.getGroupTextStyles(group.id, sectionName)"
            [excludedStyles]="['fontSize']"
            [customStyles]="{'fontSize': value + 'px'}"
          ></app-text-preview>
          <p *ngIf="group.state.scale">{{ value + 'px' }}</p>
        </ng-template>
      </app-editable-token>
    </ng-template>
  </app-groups>
  `,
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
      getDefaultTokenValue: groupId => this.getDefaultTokenValue(groupId),
      getDefaultGroupState: () => ({textPreviewId: 0, scale: false})
    })
  }

  private getDefaultTokenValue(groupId: number) {
    const group = this.store.getGroup(this.sectionName, groupId);
    if (group.state.scale) {  
      return getScaleValue(group.tokens.length, group.state.scale);
    }
    return DEFAULT_BASE_FONT_SIZE;
  }
}
