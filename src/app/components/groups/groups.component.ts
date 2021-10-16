import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ContentManagerService } from '../../services/content-manager.service';
import { EditorService } from '../../layout/editor/editor.service';
import { StoreService, TokenGroup } from '../../services/store.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.less']
})
export class GroupComponent implements OnInit {
  @Input() tokenTemplate: TemplateRef<any>;
  @Input() isTokenEditable = true;
  @Input() isGroupEditable = false;
  @Input() layout: "list" | "grid" = "grid";

  get groupList() {
    return this.store.getGroupList(this.contentManager.sectionName);
  }

  get sectionName() {
    return this.contentManager.sectionName;
  }

  constructor(
    public contentManager: ContentManagerService,
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
    const token = this.contentManager.createToken(groupId);
    this.contentManager.addToken(token, groupId);
  }

  onBlur(value: string, group: TokenGroup) {
    if (!value.length || value === group.name) {
      return;
    }
    this.contentManager.renameGroup(value, group.id)
  }
}
