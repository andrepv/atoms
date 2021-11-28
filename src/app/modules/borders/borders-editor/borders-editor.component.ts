import { Component, OnInit } from '@angular/core';
import { DBGroup } from '@core/core.model';
import { EditorService } from '@core/services/editor.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { provideSectionDeps } from '@utils/provide-section-deps';
import { BorderTokenModel, BorderTokenValue, BORDER_DB_DATA } from '../borders.model';

@Component({
  selector: 'app-borders-editor',
  templateUrl: './borders-editor.component.html',
  styleUrls: ['./borders-editor.component.less'],
  providers: [...provideSectionDeps(BORDER_DB_DATA.tableGroupName)]
})
export class BordersEditorComponent implements OnInit {
  readonly STYLES = ["dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset", "none"];

  get token() {
    return this.editor.content.token;
  }

  get group() {
    return this.editor.content.group;
  }

  constructor(
    private section: SectionContentManagerService<BorderTokenModel, DBGroup>,
    private editor: EditorService<BorderTokenModel, DBGroup>,
  ) { }

  ngOnInit() {}

  changeColor(color: string) {
    this.token.value.color = color
  }

  changeWidth(value: number) {
    this.token.value.width = value;
  }

  changeStyle(value: BorderTokenValue['style']) {
    this.token.value.style = value;
  }

  updateTokenValue() {
    this.section.setTokenValue(this.token.value, this.token.id, this.group.id);
  }

}
