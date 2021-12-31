import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { StoreToken, StoreGroup } from '@core/core.model';
import { ClipboardService } from '@core/services/clipboard.service';
import { EditorService } from '@core/services/editor.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { TextEditableComponent } from '../text-editable/text-editable.component';

@Component({
  selector: 'app-token-actions',
  templateUrl: './token-actions.component.html',
  styleUrls: ['./token-actions.component.less']
})
export class TokenActionsComponent implements OnInit {
  @Input() token: StoreToken;
  @Input() group: StoreGroup;
  @Input() editorTemplate: TemplateRef<any> = null;
  @Input() editableText: TextEditableComponent;

  constructor(
    private editor: EditorService,
    private clipboard: ClipboardService,
    private section: SectionContentManagerService,
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

  duplicate() {
    this.clipboard.duplicateToken(this.token, this.group)
  }

  async copy() {
    const token = await this.section.tokenTable.get(this.token.id);
    this.clipboard.copy(token, 'token')
  }
  
  canCopy() {
    return this.clipboard.isAvailable;
  }
}
