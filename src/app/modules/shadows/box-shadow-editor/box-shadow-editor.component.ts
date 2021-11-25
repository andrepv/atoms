import { Component, OnInit } from '@angular/core';
import { DBGroup } from '@core/core.model';
import { EditorService } from '@core/services/editor.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { DEFAULT_LAYER_VALUE } from '../box-shadow-section/box-shadow-section.component';
import { provideSectionDeps } from '@utils/provide-section-deps';
import { BoxShadowTokenModel, BOX_SHADOW_DB_DATA } from '../box-shadow-section/box-shadow-section.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-box-shadow-editor',
  templateUrl: './box-shadow-editor.component.html',
  styleUrls: ['./box-shadow-editor.component.less'],
  providers: [...provideSectionDeps(BOX_SHADOW_DB_DATA.tableGroupName)]
})
export class BoxShadowEditorComponent implements OnInit {
  get token() {
    return this.editor.content.token;
  }

  get group() {
    return this.editor.content.group;
  }

  constructor(
    private editor: EditorService<BoxShadowTokenModel, DBGroup>,
    private section: SectionContentManagerService<BoxShadowTokenModel, DBGroup>,
  ) {}

  ngOnInit() {}

  onBlockColorChange(color: string) {
    this.token.value.blockColor = color
  }

  onBackgroundColorChange(color: string) {
    this.token.value.backgroundColor = color;
  }

  updateTokenValue() {
    this.section.setTokenValue(this.token.value, this.token.id, this.group.id);
  }

  addLayer() {
    this.token.value.layers.push(DEFAULT_LAYER_VALUE)
  }

  dropLayer(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.token.value.layers, event.previousIndex, event.currentIndex);
    this.updateTokenValue();
  }

}
