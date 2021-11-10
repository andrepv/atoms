import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '@core/services/editor.service';
import { ContentManagerService } from '@core/services/content-manager.service';
import { StoreService, TokenGroup } from '@core/services/store.service';
import { TextEditableComponent } from '../text-editable/text-editable.component';

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

  async renameGroup(value: string, editableText: TextEditableComponent) {
    editableText.isLoading = true;
    try {
      await this.contentManager.renameGroup(value, this.group.id);
    } finally {
      editableText.isLoading = false;
      editableText.makeUneditable();
    }
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
