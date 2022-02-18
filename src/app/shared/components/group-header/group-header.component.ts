import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { SectionContentEditorService } from '@core/services/section-content-editor.service';
import { TextEditableComponent } from '../text-editable/text-editable.component';
import { CacheGroup } from '@core/core-types';
import { ClipboardService } from '@core/services/clipboard.service';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import SectionManagerGroupsService from '@core/services/section-manager-groups.service';
import SectionManagerContentService from '@core/services/section-manager-content.service';

type GroupActions = "add token" | "duplicate" | "edit" | "delete" | "copy" | "past";

@Component({
  selector: 'app-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.less']
})
export class GroupHeaderComponent implements OnInit {
  @Input() group: CacheGroup;
  @Input() groupEditorTemplate: TemplateRef<any>;
  @Input() customButtonsTemplate: TemplateRef<any>;
  @Input() excludedActions: GroupActions[] = [];

  constructor(
    private editor: SectionContentEditorService,
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
      await this.groupsManager.rename(value, this.group);
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
  
  canAddToken() {
    return !this.excludedActions.includes("add token");
  }

  canDuplicate() {
    return !this.excludedActions.includes("duplicate");
  }

  canEdit() {
    return !this.excludedActions.includes("edit");
  }

  canDelete() {
    return !this.excludedActions.includes("delete");
  }

  canCopy() {
    return !this.excludedActions.includes("copy");
  }

  canPast() {
    return !this.excludedActions.includes("past");
  }
}
