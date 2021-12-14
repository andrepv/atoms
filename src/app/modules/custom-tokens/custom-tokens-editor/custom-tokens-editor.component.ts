import { Component, Input, OnInit } from '@angular/core';
import { EditableContent, DBGroup } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { CustomTokensDBToken } from '../custom-tokens.model';

@Component({
  selector: 'app-custom-tokens-editor',
  templateUrl: './custom-tokens-editor.component.html',
  styleUrls: ['./custom-tokens-editor.component.less']
})
export class CustomTokensEditorComponent implements OnInit {
  @Input() content: EditableContent<CustomTokensDBToken, DBGroup>;
  name: string;
  value: string;

  get token() {
    return this.content.token;
  }

  get group() {
    return this.content.group;
  }

  constructor(private section: SectionContentManagerService<CustomTokensDBToken, DBGroup>) {}

  ngOnInit() {
    this.name = this.token.name;
    this.value = this.token.value;
  }

  save(propName: string) {
    const inputValue = this[propName].trim();
    if (inputValue.length && inputValue !== this.token[propName]) {
      this.section.updateToken(this.token, this.group, {
        [propName]: inputValue
      })
    } else {
      this[propName] = this.token[propName];
    }
  }

}
