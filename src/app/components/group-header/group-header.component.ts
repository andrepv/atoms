import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../../layout/editor/editor.service';
import { ContentManagerService } from '../../services/content-manager.service';
import { StoreService, TokenGroup } from '../../services/store.service';

@Component({
  selector: 'app-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.less']
})
export class GroupHeaderComponent implements OnInit {
  @Input() group: TokenGroup;
  isGroupEditable: boolean;

  constructor(
    private editor: EditorService,
    private contentManager: ContentManagerService,
    private store: StoreService
  ) {
    this.isGroupEditable = this.contentManager.sectionViewConfigs.isGroupEditable;
  }

  ngOnInit() {}

  openEditor() {
    this.editor.enable(this.contentManager.sectionName, {group: this.group})
  }

  renameGroup(value: string) {
    if (!value.length || value === this.group.name) return;
    this.contentManager.renameGroup(value, this.group.id)
  }

  deleteGroup() {
    this.contentManager.deleteGroup(this.group.id)
  }

  pastToken() {
    this.contentManager.clipboard.pastToken(this.group.id)
  }

  copyGroup() {
    this.contentManager.clipboard.copy(this.group)
  }

  canUseClipboard() {
    return this.store.isClipboardActionsAvailable
  }
}
