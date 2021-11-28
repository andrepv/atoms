import { Component, Input, OnInit } from '@angular/core';
import { DBGroup } from '@core/core.model';
import { EditorService } from '@core/services/editor.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { BoxShadowLayer, BoxShadowTokenModel } from './../../box-shadow-section/box-shadow-section.model';

type NumericPropertyNames = keyof Omit<BoxShadowLayer, 'inset' | 'color'>;

@Component({
  selector: 'app-box-shadow-layer',
  templateUrl: './box-shadow-layer.component.html',
  styleUrls: ['./box-shadow-layer.component.less']
})
export class BoxShadowLayerComponent implements OnInit {
  @Input() layer: BoxShadowLayer;
  @Input() index: number;

  get token() {
    return this.editor.content.token;
  }

  get group() {
    return this.editor.content.group;
  }

  get canDeleteLayer() {
    return Boolean(this.token.value.layers.length > 1)
  }

  offsetX = 0;
  offsetY = 0;
  blur = 0;
  spread = 0;
  inset = false;
  color = "#fff";

  isHidden = false;

  constructor(
    private section: SectionContentManagerService<BoxShadowTokenModel, DBGroup>,
    private editor: EditorService<BoxShadowTokenModel, DBGroup>,
  ) {}
  
  ngOnInit() {
    this.offsetX = parseInt(this.layer.offsetX);
    this.offsetY = parseInt(this.layer.offsetY);
    this.blur = parseInt(this.layer.blur);
    this.spread = parseInt(this.layer.spread);
    this.inset = Boolean(this.layer.inset);
    this.color = this.layer.color;
  }

  changeValue(valueName: NumericPropertyNames) {
    this.layer[valueName] = `${this[valueName]}px`;
  }

  onInputChange(valueName: NumericPropertyNames) {
    this.changeValue(valueName);
    this.saveValue();
  }

  toggleInset() {
    this.layer.inset = !this.inset ? "" : "inset";
  }
  
  changeColor(color: string) {
    this.layer.color = color;
  }
  
  saveValue() {
    this.section.setTokenValue(this.token.value, this.token.id, this.group.id);
  }

  deleteLayer() {
    this.token.value.layers.splice(this.index, 1);
    this.saveValue();
  }

  toggleVisibility() {
    this.isHidden = !this.isHidden
  }
}
