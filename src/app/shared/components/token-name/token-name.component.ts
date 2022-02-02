import { Component, Input, OnInit } from '@angular/core';
import { StoreToken } from '@core/core-types';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { TextEditableComponent } from '../text-editable/text-editable.component';

@Component({
  selector: 'app-token-name',
  templateUrl: './token-name.component.html',
  styleUrls: ['./token-name.component.less']
})
export class TokenNameComponent implements OnInit {
  @Input() token: StoreToken;

  constructor(private tokenManager: SectionManagerTokensService) {}

  ngOnInit() {}

  async rename(value: string, editableText: TextEditableComponent) {
    editableText.isLoading = true;
    try {
      await this.tokenManager.rename(value, this.token)
    } finally {
      editableText.isLoading = false;
      editableText.makeUneditable();
    }
  }
}
