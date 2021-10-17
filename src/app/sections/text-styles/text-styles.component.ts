import { Component, OnInit } from '@angular/core';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';

export const DEFAULT_TEXT_STYLES = {
  fontFamily: 'Arial',
  fontSize: 35,
  lineHeight: 1.5,
  letterSpacing: 0,
  text: 'Quick brown fox jumped over the lazy red dog'
}

@Component({
  selector: 'app-text-styles',
  template: `
    <app-groups [tokenTemplate]="tokenTemplateRef" layout="list">
      <ng-template #tokenTemplateRef let-token>
        <div
          class="token"
          [style.fontFamily]="token.value.fontFamily"
          [style.fontSize]="token.value.fontSize + 'px'"
          [style.lineHeight]="token.value.lineHeight"
          [style.letterSpacing]="token.value.letterSpacing + 'em'"
        >
          <p>{{ token.value.text }}</p>
        </div>
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
  constructor(public contentManager: ContentManagerService) {}

  ngOnInit() {
    this.contentManager.configure({
      getDefaultTokenValue: () => DEFAULT_TEXT_STYLES,
    })
  }
}
