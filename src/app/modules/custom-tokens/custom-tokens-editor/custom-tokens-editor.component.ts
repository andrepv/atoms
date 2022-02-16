import { Component, Input, OnInit } from '@angular/core';
import { EditableSectionContent } from '@core/core-types';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { StorageGroup } from '@core/storages/storages-types';
import { CustomTokensDBToken } from '../custom-tokens.model';

@Component({
  selector: 'app-custom-tokens-editor',
  templateUrl: './custom-tokens-editor.component.html',
  styleUrls: ['./custom-tokens-editor.component.less']
})
export class CustomTokensEditorComponent implements OnInit {
  @Input() content: EditableSectionContent<CustomTokensDBToken, StorageGroup>;
  name: string;
  value: string;

  get token() {
    return this.content.token;
  }

  get group() {
    return this.content.group;
  }

  constructor(private tokens: SectionManagerTokensService<CustomTokensDBToken, StorageGroup>) {}

  ngOnInit() {
    this.name = this.token.name;
    this.value = this.token.value;
  }

  save(propName: string) {
    const inputValue = this[propName].trim();
    if (inputValue.length && inputValue !== this.token[propName]) {
      this.tokens.update(this.token, {[propName]: inputValue})
    } else {
      this[propName] = this.token[propName];
    }
  }

}
