import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { EditorService } from '@core/services/editor.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
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
  @Input() editorTemplate: TemplateRef<any> = null;

  constructor(
    private section: SectionContentManagerService,
    private clipboard: ClipboardService,
    private editor: EditorService,
  ) {}

  ngOnInit() {}

  openEditor(editorTemplateRef: TemplateRef<any>) {
    this.editor.enable(
      this.section.sectionName,
      {group: this.group, token: this.token},
      editorTemplateRef
    )
  }

  delete() {
    this.section.deleteToken(this.token, this.group)
  }

  async rename(value: string, editableText: TextEditableComponent) {
    editableText.isLoading = true;
    try {
      await this.section.renameToken(value, this.token)
    } finally {
      editableText.isLoading = false;
      editableText.makeUneditable();
    }
  }
  
  async copy() {
    const token = await this.section.tokenTable.get(this.token.id);
    this.clipboard.copy(token, 'token')
  }
  
  canCopy() {
    return this.clipboard.isAvailable;
  }
}
