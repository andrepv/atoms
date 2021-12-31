import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { EditorService } from '@core/services/editor.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
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
  @Input() groupEditorTemplate: TemplateRef<any>;

  constructor(
    private editor: EditorService,
    private section: SectionContentManagerService,
    private clipboard: ClipboardService,
  ) {}

  ngOnInit() {}

  openEditor(editorTemplateRef: TemplateRef<any>) {
    this.editor.enable(
      this.section.sectionName,
      {group: this.group},
      editorTemplateRef
    )
  }

  async renameGroup(value: string, editableText: TextEditableComponent) {
    editableText.isLoading = true;
    try {
      await this.section.renameGroup(value, this.group);
    } finally {
      editableText.isLoading = false;
      editableText.makeUneditable();
    }
  }

  deleteGroup() {
    this.section.deleteGroup(this.group);
  }

  pastToken() {
    this.clipboard.pastToken(this.group)
  }

  async copyGroup() {
    const group = await this.section.groupTable.get(this.group.id)
    const tokens = await this.section.tokenTable.where("groupId").equals(group.id).toArray()

    group.tokens = tokens;

    this.clipboard.copy(group, 'group')
  }

  duplicateGroup() {
    this.clipboard.duplicateGroup(this.group);
  }

  canUseClipboard() {
    return this.clipboard.isAvailable;
  }
}
