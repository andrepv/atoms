import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { EditorService } from '@core/services/editor.service';
import { TextEditableComponent } from '../text-editable/text-editable.component';
import { StoreGroup } from '@core/core-types';
import { ClipboardService } from '@core/services/clipboard.service';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import SectionManagerGroupsService from '@core/services/section-manager-groups.service';
import SectionManagerContentService from '@core/services/section-manager-content.service';

@Component({
  selector: 'app-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.less']
})
export class GroupHeaderComponent implements OnInit {
  @Input() group: StoreGroup;
  @Input() groupEditorTemplate: TemplateRef<any>;
  @Input() customButtonsTemplate: TemplateRef<any>;

  constructor(
    private editor: EditorService,
    private clipboard: ClipboardService,
    private tokensManager: SectionManagerTokensService,
    private groupsManager: SectionManagerGroupsService,
    private section: SectionManagerContentService,
  ) {}

  ngOnInit() {}

  openEditor(editorTemplateRef: TemplateRef<any>) {
    this.editor.enable(
      this.section.name,
      {group: this.group},
      editorTemplateRef
    )
  }

  async renameGroup(value: string, editableText: TextEditableComponent) {
    editableText.isLoading = true;
    try {
      if (this.groupsManager) {
        await this.groupsManager.rename(value, this.group);
      } else {
        await this.groupsManager.rename(value, this.group);
      }
    } finally {
      editableText.isLoading = false;
      editableText.makeUneditable();
    }
  }

  deleteGroup() {
    this.groupsManager.delete(this.group);
  }

  pastToken() {
    this.tokensManager.past(this.group)
  }

  addToken() {
    this.tokensManager.addToGroup(this.group);
  }

  async copyGroup() {
    this.groupsManager.copy(this.group)
  }

  duplicateGroup() {
    this.groupsManager.duplicate(this.group);
  }

  canUseClipboard() {
    return this.clipboard.isAvailable;
  }
}
