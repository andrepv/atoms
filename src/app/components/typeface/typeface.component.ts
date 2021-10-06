import { Component, Inject, OnInit } from '@angular/core';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';
import { getContentManagerProvider } from '../../utils/get-content-manager-provider';
import { StoreService, Token, TokenGroup } from '../../services/store.service';
import { FontManagerService } from '../typeface-editor/font-manager.service';

const {token, provider} = getContentManagerProvider(db.typeface);

@Component({
  selector: 'app-typeface',
  templateUrl: './typeface.component.html',
  styleUrls: ['./typeface.component.less'],
  providers: [provider]
})
export class TypefaceComponent implements OnInit {
  readonly sectionName = "Type Face";

  get groupList() {
    return this.store.getGroupList(this.sectionName);
  }

  constructor(
    @Inject(token) 
    public contentManager: ContentManagerService,
    public store: StoreService,
    private fontManager: FontManagerService
  ) {}

  ngOnInit() {
    this.contentManager.onLoad = () => this.fontManager.load(this.groupList);
    this.contentManager.load();
  }

  ngOnDestroy() {
    this.contentManager.subscription.unsubscribe();
  }

  addGroup() {
    const group = this.contentManager.createGroup();
    this.contentManager.addGroup(group);
  }

  addToken(groupId: number) {
    const token = this.contentManager.createToken(groupId, '');
    this.contentManager.addToken(token, groupId);
  }

  openEditor(token: Token, group: TokenGroup) {
    this.store.editor.enable(this.sectionName, {token, group})
  }
}
