import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { EditorService } from '../../layout/editor/editor.service';
import { ContentManagerService } from '../../services/content-manager.service';
import { StoreService, Token, TokenGroup } from '../../services/store.service';
import { TextEditableComponent } from '../text-editable/text-editable.component';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.less']
})
export class TokenComponent implements OnInit {
  @Input() token: Token;
  @Input() group: TokenGroup;
  @Input() previewTemplate: TemplateRef<any>;
  isEditable = true;

  constructor(
    private contentManager: ContentManagerService,
    private editor: EditorService,
    private store: StoreService
  ) {
    this.isEditable = this.contentManager.sectionViewConfigs.isTokenEditable;
  }

  ngOnInit() {}

  openEditor() {
    this.editor.enable(
      this.contentManager.sectionName,
      {group: this.group, token: this.token}
    )
  }

  delete() {
    this.contentManager.deleteToken(this.token.id, this.group.id)
  }

  async rename(value: string, editableText: TextEditableComponent) {
    editableText.isLoading = true;
    try {
      await this.contentManager.renameToken(value, this.token.id, this.group.id)
    } finally {
      editableText.isLoading = false;
      editableText.makeUneditable();
    }
  }
  
  copy() {
    this.contentManager.clipboard.copy(this.token)
  }
  
  canCopy() {
    return this.store.isClipboardActionsAvailable;
  }
}
