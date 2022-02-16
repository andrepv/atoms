import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { CacheToken, CacheGroup } from '@core/core-types';
import SectionManagerContentService from '@core/services/section-manager-content.service';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { ClipboardService } from '@core/services/clipboard.service';
import { EditorService } from '@core/services/editor.service';

@Component({
  selector: 'app-token-actions',
  templateUrl: './token-actions.component.html',
  styleUrls: ['./token-actions.component.less']
})
export class TokenActionsComponent implements OnInit {
  @Input() token: CacheToken;
  @Input() group: CacheGroup;
  @Input() editorTemplate: TemplateRef<any> = null;

  constructor(
    private editor: EditorService,
    private clipboard: ClipboardService,
    private tokenManager: SectionManagerTokensService,
    private section: SectionManagerContentService,
  ) {}

  ngOnInit() {}

  openEditor(editorTemplateRef: TemplateRef<any>) {
    this.editor.enable(
      this.section.name,
      {group: this.group, token: this.token},
      editorTemplateRef
    )
  }

  delete() {
    this.tokenManager.delete(this.token, this.group)
  }

  duplicate() {
    this.tokenManager.duplicate(this.token, this.group)
  }

  async copy() {
    this.tokenManager.copy(this.token)
  }
  
  canCopy() {
    return this.clipboard.isAvailable;
  }
}
