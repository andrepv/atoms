import { Component, Input, OnInit } from '@angular/core';
import { EditableContent } from '@core/core-types';
import { BoxShadowDBToken } from '../box-shadow-section/box-shadow-section.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { StorageGroup } from '@core/storages/storages-types';

@Component({
  selector: 'app-box-shadow-editor',
  templateUrl: './box-shadow-editor.component.html',
  styleUrls: ['./box-shadow-editor.component.less'],
})
export class BoxShadowEditorComponent implements OnInit {
  @Input() content: EditableContent<BoxShadowDBToken, StorageGroup>;

  get token() {
    return this.content.token;
  }

  get group() {
    return this.content.group;
  }

  constructor(private tokens: SectionManagerTokensService<BoxShadowDBToken, StorageGroup>) {}

  ngOnInit() {}

  changeBlockColor(color: string) {
    this.token.blockColor = color
  }

  saveBlockColor() {
    this.tokens.update(this.token, {blockColor: this.token.blockColor});
  }

  changeBackgroundColor(color: string) {
    this.token.backgroundColor = color;
  }

  saveBackgroundColor() {
    this.tokens.update(this.token, {backgroundColor: this.token.backgroundColor});
  }

  addLayer() {
    this.token.layers.push({
      offsetX: '17px',
      offsetY: '17px',
      blur: '12px',
      spread: '2px',
      color: '#2e475a',
      inset: ''
    })

    this.tokens.update(this.token, {layers: this.token.layers});
  }

  dropLayer(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.token.layers, event.previousIndex, event.currentIndex);

    this.tokens.update(this.token, {layers: this.token.layers});
  }
}
