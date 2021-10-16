import { Component, OnInit } from '@angular/core';
import { DEFAULT_BASE_FONT_SIZE } from '../../editors/typescale-editor/typescale-editor.component';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';
import { StoreService } from '../../services/store.service';
import { getScaleValue } from '../../utils/get-type-scale-value';

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
        [isEditable]="!group.state"
        [minValue]="MIN_FONT_SIZE"
        [maxValue]="MAX_FONT_SIZE"
        [value]="token.value"
        [previewTemplate]="tokenPreviewRef"
        (onAfterChange)="contentManager.setTokenValue($event, token.id, group.id)"
      >
        <ng-template #tokenPreviewRef let-value>
          <p [style.font-size]="value + 'px'">
            The quick brown fox jumps
          </p>
          <p *ngIf="group.state">{{ value + 'px' }}</p>
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

  constructor(
    public contentManager: ContentManagerService,
    private store: StoreService,
  ) {}

  ngOnInit() {
    this.contentManager.configure({
      getDefaultTokenValue: groupId => this.getDefaultTokenValue(groupId),
      getDefaultGroupState: () => false
    })
  }

  private getDefaultTokenValue(groupId: number) {
    const group = this.store.getGroup(
      this.contentManager.sectionName,
      groupId
    );
    if (group.state) {  
      return getScaleValue(group.tokens.length, group.state);
    }
    return DEFAULT_BASE_FONT_SIZE;
  }
}
