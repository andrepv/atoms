import { Component, OnInit } from '@angular/core';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';

@Component({
  selector: 'app-text-styles',
  template: `
    <app-groups [tokenTemplate]="tokenTemplateRef" layout="list">
      <ng-template #tokenTemplateRef let-token>
        <app-text-preview [data]="token.value"></app-text-preview>
      </ng-template>
    </app-groups>
  `,
  styleUrls: ['./text-styles.component.less'],
  providers: [
    {provide: 'tables', useValue: db.textStyles},
    ContentManagerService
  ]
})
export class TextStylesComponent implements OnInit {
  constructor(private contentManager: ContentManagerService) {}

  ngOnInit() {
    this.contentManager.configure({
      getDefaultTokenValue: () => ({}),
    })
  }
}
