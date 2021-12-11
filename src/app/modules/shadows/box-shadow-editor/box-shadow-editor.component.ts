import { Component, Input, OnInit } from '@angular/core';
import { DBGroup, EditableContent } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { BoxShadowDBToken } from '../box-shadow-section/box-shadow-section.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-box-shadow-editor',
  templateUrl: './box-shadow-editor.component.html',
  styleUrls: ['./box-shadow-editor.component.less'],
})
export class BoxShadowEditorComponent implements OnInit {
  @Input() content: EditableContent<BoxShadowDBToken, DBGroup>;

  get token() {
    return this.content.token;
  }

  get group() {
    return this.content.group;
  }

  constructor(private section: SectionContentManagerService) {}

  ngOnInit() {}

  changeBlockColor(color: string) {
    this.token.blockColor = color
  }

  saveBlockColor() {
    this.section.updateToken(this.token, this.group, {
      blockColor: this.token.blockColor
    });
  }

  changeBackgroundColor(color: string) {
    this.token.backgroundColor = color;
  }

  saveBackgroundColor() {
    this.section.updateToken(this.token, this.group, {
      backgroundColor: this.token.backgroundColor
    });
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

    this.section.updateToken(this.token, this.group, {
      layers: this.token.layers
    });
  }

  dropLayer(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.token.layers, event.previousIndex, event.currentIndex);

    this.section.updateToken(this.token, this.group, {
      layers: this.token.layers
    });
  }
}
