import { Component, OnInit } from '@angular/core';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';

@Component({
  selector: 'app-line-height',
  template: `
    <app-groups
      [tokenTemplate]="tokenTemplateRef"
      [isTokenEditable]="false"
      [isGroupEditable]="false"
      layout="list"
    >
      <ng-template #tokenTemplateRef let-token let-group="group">
        <app-editable-token
          [step]="0.1"
          [minValue]="1"
          [maxValue]="4"
          [value]="token.value"
          [previewTemplate]="tokenPreviewRef"
          (onAfterChange)="contentManager.setTokenValue($event, token.id, group.id)"
        >
          <ng-template #tokenPreviewRef let-value>
            <h1 [style.line-height]="value">
              Lorem ipsum dolor sit amet, consectetur adipiscing
            </h1>
          </ng-template>
        </app-editable-token>
      </ng-template>
    </app-groups>
  `,
  providers: [
    {provide: 'tables', useValue: db.lineHeight},
    ContentManagerService,
  ]
})
export class LineHeightComponent implements OnInit {
  constructor(public contentManager: ContentManagerService) {}

  ngOnInit() {
    this.contentManager.configure({
      getDefaultTokenValue: () => 1,
    })
  }

}
