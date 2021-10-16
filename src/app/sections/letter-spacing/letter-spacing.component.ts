import { Component, OnInit } from '@angular/core';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';

@Component({
  selector: 'app-letter-spacing',
  template: `
    <app-groups
      [tokenTemplate]="tokenTemplateRef"
      [isTokenEditable]="false"
      [isGroupEditable]="false"
      layout="list"
    >
      <ng-template #tokenTemplateRef let-token let-group="group">
        <app-editable-token
          [step]="0.01"
          [minValue]="-0.1"
          [maxValue]="1"
          [value]="token.value"
          [previewTemplate]="tokenPreviewRef"
          (onAfterChange)="contentManager.setTokenValue($event, token.id, group.id)"
        >
          <ng-template #tokenPreviewRef let-value>
            <p [style.letter-spacing]="value + 'em'">
              The quick brown fox jumps
            </p>
          </ng-template>
        </app-editable-token>
      </ng-template>
    </app-groups>
  `,
  providers: [
    {provide: 'tables', useValue: db.letterSpacing},
    ContentManagerService,
  ]
})
export class LetterSpacingComponent implements OnInit {

  constructor(public contentManager: ContentManagerService) {}

  ngOnInit() {
    this.contentManager.configure({
      getDefaultTokenValue: () => 0.01,
    })
  }
}
