import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ContentManagerService } from '../../services/content-manager.service';
import { EditorService } from '../../layout/editor/editor.service';
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
  @Input() isGroupEditable = false;
  @Input() layout: "list" | "grid" = "grid";

  get groupList() {
    return this.store.getGroupList(this.sectionName);
  }

  constructor(
    public editor: EditorService,
    public store: StoreService
  ) {}

  ngOnInit() {
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
    const tokenValue = this.contentManager.getDefaultTokenValue();
    const token = this.contentManager.createToken(groupId, tokenValue);
    this.contentManager.addToken(token, groupId);
  }

  onBlur(value: string, group: TokenGroup) {
    if (!value.length || value === group.name) {
      return;
    }
    this.contentManager.renameGroup(value, group.id)
  }
}
