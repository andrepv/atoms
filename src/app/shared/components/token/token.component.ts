import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { EditorService } from '@core/services/editor.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { StoreService } from '@core/services/store.service';
import { TextEditableComponent } from '../text-editable/text-editable.component';
import { StoreToken, StoreGroup } from '@core/core.model';
import { ClipboardService } from '@core/services/clipboard.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.less']
})
export class TokenComponent implements OnInit {
  @Input() token: StoreToken;
  @Input() group: StoreGroup;
  @Input() previewTemplate: TemplateRef<any>;
  isEditable = true;

  constructor(
    private section: SectionContentManagerService,
    private clipboard: ClipboardService,
    private editor: EditorService,
    private store: StoreService
  ) {
    this.isEditable = this.section.sectionViewConfigs.isTokenEditable;
  }

  ngOnInit() {}

  openEditor() {
    this.editor.enable(
      this.section.sectionName,
      {group: this.group, token: this.token}
    )
  }

  delete() {
    this.section.deleteToken(this.token.id, this.group.id)
  }

  async rename(value: string, editableText: TextEditableComponent) {
    editableText.isLoading = true;
    try {
      await this.section.renameToken(value, this.token.id, this.group.id)
    } finally {
      editableText.isLoading = false;
      editableText.makeUneditable();
    }
  }
  
  copy() {
    this.clipboard.copy(this.token)
  }
  
  canCopy() {
    return this.store.isClipboardActionsAvailable;
  }
}
