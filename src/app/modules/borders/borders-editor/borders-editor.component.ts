import { Component, Input, OnInit } from '@angular/core';
import { DBGroup, EditableContent } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { BorderDBToken } from '../borders.model';

@Component({
  selector: 'app-borders-editor',
  templateUrl: './borders-editor.component.html',
  styleUrls: ['./borders-editor.component.less'],
})
export class BordersEditorComponent implements OnInit {
  @Input() content: EditableContent<BorderDBToken, DBGroup>;

  readonly STYLES = ["dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset", "none"];

  get token() {
    return this.content.token;
  }

  get group() {
    return this.content.group;
  }

  constructor(
    private section: SectionContentManagerService<BorderDBToken, DBGroup>,
  ) {}

  ngOnInit() {}

  changeColor(color: string) {
    this.token.color = color
  }

  saveColor() {
    this.section.updateToken(this.token, this.group, {
      color: this.token.color
    });
  }
  
  changeWidth(value: number) {
    this.token.width = value;
  }
  
  saveWidth() {
    this.section.updateToken(this.token, this.group, {
      width: this.token.width
    });
  }

  changeStyle(value: BorderDBToken['style']) {
    this.token.style = value;
    this.section.updateToken(this.token, this.group, {
      style: this.token.style
    });
  }
}
