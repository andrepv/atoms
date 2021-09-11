import { Component, Inject, OnInit } from '@angular/core';
import { ContentManagerService } from '../../services/content-manager.service';
import { db, TokenGroupModel, TokenModel } from '../../services/db.service';
import { getContentManagerProvider } from '../../services/get-content-manager-provider';
import { StoreService, Token } from '../../services/store.service';

const {token, provider} = getContentManagerProvider(db.typescale)

@Component({
  selector: 'app-typescale',
  templateUrl: './typescale.component.html',
  styleUrls: ['./typescale.component.less'],
  providers: [provider]
})
export class TypescaleComponent implements OnInit {
  readonly sectionName = "Type Scale";

  get groupList() {
    return this.store.getGroupList(this.sectionName);
  }

  constructor(
    @Inject(token) 
    public contentManager: ContentManagerService<any, any>,
    public store: StoreService,
  ) {}

  ngOnInit() {
    this.contentManager.load();
  }

  ngOnDestroy() {
    this.contentManager.subscription.unsubscribe();
  }

  addGroup() {
    this.contentManager.addGroup({
      name: 'group',
      themeId: this.store.themeManager.selected.id,
      tokensId: [],
    } as TokenGroupModel);
  }

  addToken(groupId: number) {
    this.contentManager.addToken({
      name: "token",
      value: "",
      groupId,
      themeId: this.store.themeManager.selected.id,
    } as TokenModel<string>, groupId)
  }

  renameToken(value: string, token: Token<any>, groupId: number) {
    if (!value.length || value === token.name) {
      return;
    }
    this.contentManager.renameToken(value, token.id, groupId)
  }
}
