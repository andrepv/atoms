import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { TextEditableComponent } from '../text-editable/text-editable.component';
import { StoreToken, StoreGroup } from '@core/core.model';

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
  ) {}

  ngOnInit() {}


  async rename(value: string, editableText: TextEditableComponent) {
    editableText.isLoading = true;
    try {
      await this.section.renameToken(value, this.token)
    } finally {
      editableText.isLoading = false;
      editableText.makeUneditable();
    }
  }
}
