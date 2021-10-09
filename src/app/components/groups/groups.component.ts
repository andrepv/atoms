import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ContentManagerService } from '../../services/content-manager.service';
import { EditorService } from '../../services/editor.service';
import { SectionNames, StoreService, Token, TokenGroup } from '../../services/store.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.less']
})
export class GroupComponent implements OnInit {
  @Input() sectionName: SectionNames;
  @Input() contentManager: ContentManagerService;
  @Input() tokenTemplate: TemplateRef<any>;
  @Input() isTokenEditable = true;
  @Input() layout: "list" | "grid" = "grid";

  get groupList() {
    return this.store.getGroupList(this.sectionName);
  }

  constructor(
    private editor: EditorService,
    public store: StoreService
  ) {}

  ngOnInit() {
    this.contentManager.load();
  }

  ngOnDestroy() {
    this.contentManager.subscription.unsubscribe();
  }

  openEditor(token: Token, group: TokenGroup) {
    this.editor.enable(this.sectionName, {token, group})
  }

  addGroup() {
    const group = this.contentManager.createGroup();
    this.contentManager.addGroup(group);
  }

  addToken(groupId: number) {
    const tokenValue = this.contentManager.getDefaultTokenValue();
    const token = this.contentManager.createToken(groupId, tokenValue);
    this.contentManager.addToken(token, groupId);
  }
}
