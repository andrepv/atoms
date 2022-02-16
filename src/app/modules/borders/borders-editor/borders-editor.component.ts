import { Component, Input, OnInit } from '@angular/core';
import { EditableSectionContent } from '@core/core-types';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { StorageGroup } from '@core/storages/storages-types';
import { BorderDBToken } from '../borders.model';

@Component({
  selector: 'app-borders-editor',
  templateUrl: './borders-editor.component.html',
  styleUrls: ['./borders-editor.component.less'],
})
export class BordersEditorComponent implements OnInit {
  @Input() content: EditableSectionContent<BorderDBToken, StorageGroup>;

  readonly STYLES = ["dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset", "none"];

  get token() {
    return this.content.token;
  }

  get group() {
    return this.content.group;
  }

  constructor(private tokens: SectionManagerTokensService<BorderDBToken, StorageGroup>) {}

  ngOnInit() {}

  changeColor(color: string) {
    this.token.color = color
  }

  saveColor() {
    this.tokens.update(this.token, {color: this.token.color});
  }
  
  changeWidth(value: number) {
    this.token.width = value;
  }
  
  saveWidth() {
    this.tokens.update(this.token, {width: this.token.width});
  }

  changeStyle(value: BorderDBToken['style']) {
    this.token.style = value;
    this.tokens.update(this.token, {style: this.token.style});
  }
}
