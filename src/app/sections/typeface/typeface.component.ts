import { Component, OnInit } from '@angular/core';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';
import { StoreService } from '../../services/store.service';
import { FontManagerService } from '../../editors/typeface-editor/font-manager.service';

@Component({
  selector: 'app-typeface',
  template: `
    <app-groups [tokenTemplate]="tokenTemplateRef">
      <ng-template #tokenTemplateRef let-token>
        <div class="token" [style.font-family]="token.value.family">
          <h1>Ag</h1>
          <p>{{ token.value.family }}</p>
        </div>
      </ng-template>
    </app-groups>
  `,
  styleUrls: ['./typeface.component.less'],
  providers: [
    {provide: 'tables', useValue: db.typeface},
    ContentManagerService
  ]
})
export class TypefaceComponent implements OnInit {
  constructor(
    public contentManager: ContentManagerService,
    private store: StoreService,
    private fontManager: FontManagerService,
  ) {}

  ngOnInit() {
    this.contentManager.configure({
      onLoad: () => this.loadFonts(),
      getDefaultTokenValue: () => ({
        family: 'Arial',
        type: "custom-font",
        data: '',
      })
    })
  }

  private loadFonts() {
    const groupList = this.store.getGroupList(this.contentManager.sectionName);
    for (let group of groupList) {
      const fonts = group.tokens.map(token => token.value);
      this.fontManager.load(fonts);
    }
  }
}
