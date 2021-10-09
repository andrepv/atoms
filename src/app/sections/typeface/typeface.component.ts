import { Component, Inject, OnInit } from '@angular/core';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';
import { getContentManagerProvider } from '../../utils/get-content-manager-provider';
import { StoreService, Token, TokenGroup } from '../../services/store.service';
import { FontManagerService } from '../../editors/typeface-editor/font-manager.service';
import { EditorService } from '../../services/editor.service';

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
    private fontManager: FontManagerService,
    private editor: EditorService,
  ) {}

  ngOnInit() {
    this.contentManager.onLoad = () => {
      for (let group of this.groupList) {
        const fonts = group.tokens.map(token => token.value);
        this.fontManager.load(fonts);
      }
    };
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
    const token = this.contentManager.createToken(groupId, {
      family: 'Arial',
      type: "custom-font",
      data: '',
    });
    this.contentManager.addToken(token, groupId);
  }

  openEditor(token: Token, group: TokenGroup) {
    this.editor.enable(this.sectionName, {token, group})
  }
}
