import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '@core/services/editor.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { StoreService } from '@core/services/store.service';
import { TextEditableComponent } from '../text-editable/text-editable.component';
import { StoreGroup } from '@core/core.model';
import { ClipboardService } from '@core/services/clipboard.service';

@Component({
  selector: 'app-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.less']
})
export class GroupHeaderComponent implements OnInit {
  @Input() group: StoreGroup;
  isGroupEditable: boolean;

  constructor(
    private editor: EditorService,
    private section: SectionContentManagerService,
    private clipboard: ClipboardService,
    private store: StoreService
  ) {
    this.isGroupEditable = this.section.sectionViewConfigs.isGroupEditable;
  }

  ngOnInit() {}

  openEditor() {
    this.editor.enable(this.section.sectionName, {group: this.group})
  }

  async renameGroup(value: string, editableText: TextEditableComponent) {
    editableText.isLoading = true;
    try {
      await this.section.renameGroup(value, this.group.id);
    } finally {
      editableText.isLoading = false;
      editableText.makeUneditable();
    }
  }

  deleteGroup() {
    this.section.deleteGroup(this.group.id)
  }

  pastToken() {
    this.clipboard.pastToken(this.group.id)
  }

  copyGroup() {
    this.clipboard.copy(this.group)
  }

  canUseClipboard() {
    return this.store.isClipboardActionsAvailable
  }
}
