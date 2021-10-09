import { Component, Inject, OnInit } from '@angular/core';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';
import { getContentManagerProvider } from '../../utils/get-content-manager-provider';
import { StoreService } from '../../services/store.service';
import { FontManagerService } from '../../editors/typeface-editor/font-manager.service';

const {token, provider} = getContentManagerProvider(db.typeface);

@Component({
  selector: 'app-typeface',
  template: `
    <app-groups
      [sectionName]="sectionName"
      [contentManager]="contentManager"
      [tokenTemplate]="tokenTemplateRef"
    >
      <ng-template #tokenTemplateRef let-token>
        <div class="token" [style.font-family]="token.value.family">
          <h1>Ag</h1>
          <p>{{ token.value.family }}</p>
        </div>
      </ng-template>
    </app-groups>
  `,
  styleUrls: ['./typeface.component.less'],
  providers: [provider]
})
export class TypefaceComponent implements OnInit {
  readonly sectionName = "Type Face";

  constructor(
    @Inject(token) 
    public contentManager: ContentManagerService,
    private store: StoreService,
    private fontManager: FontManagerService,
  ) {}

  ngOnInit() {
    this.contentManager.onLoad = () => this.loadFonts();
    this.contentManager.getDefaultTokenValue = () => ({
      family: 'Arial',
      type: "custom-font",
      data: '',
    })
  }

  private loadFonts() {
    const groupList = this.store.getGroupList(this.sectionName);
    for (let group of groupList) {
      const fonts = group.tokens.map(token => token.value);
      this.fontManager.load(fonts);
    }
  }
}
