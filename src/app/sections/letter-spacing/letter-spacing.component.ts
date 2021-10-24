import { Component, OnInit } from '@angular/core';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';
import { TextStylesService } from '../text-styles/text-styles.service';

@Component({
  selector: 'app-letter-spacing',
  template: `
    <app-groups
      [tokenTemplate]="tokenTemplateRef"
      [isTokenEditable]="false"
      [isGroupEditable]="true"
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
            <app-text-preview
              [data]="textPreview.getGroupTextStyles(group.id, sectionName)"
              [excludedStyles]="['letterSpacing']"
              [customStyles]="{'letterSpacing': value + 'em'}"
            ></app-text-preview>
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
  get sectionName() {
    return this.contentManager.sectionName;
  }

  constructor(
    public contentManager: ContentManagerService,
    public textPreview: TextStylesService,
  ) {}

  ngOnInit() {
    this.contentManager.configure({
      getDefaultTokenValue: () => 0.01,
      getDefaultGroupState: () => ({textPreviewId: 0})
    })
  }
}
