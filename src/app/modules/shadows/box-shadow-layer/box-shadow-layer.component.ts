import { Component, Input, OnInit } from '@angular/core';
import { DBGroup, EditableContent } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { BoxShadowLayer, BoxShadowDBToken } from '../box-shadow-section/box-shadow-section.model';

type NumericPropertyNames = keyof Omit<BoxShadowLayer, 'inset' | 'color'>;

@Component({
  selector: 'app-box-shadow-layer',
  templateUrl: './box-shadow-layer.component.html',
  styleUrls: ['./box-shadow-layer.component.less']
})
export class BoxShadowLayerComponent implements OnInit {
  @Input() content: EditableContent<BoxShadowDBToken, DBGroup>;
  @Input() layer: BoxShadowLayer;
  @Input() index: number;

  get token() {
    return this.content.token;
  }

  get group() {
    return this.content.group;
  }

  get canDeleteLayer() {
    return Boolean(this.token.layers.length > 1)
  }

  offsetX = 0;
  offsetY = 0;
  blur = 0;
  spread = 0;
  inset = false;
  color = "#fff";

  isHidden = false;

  constructor(
    private section: SectionContentManagerService<BoxShadowDBToken, DBGroup>,
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

  toggleInset() {
    this.layer.inset = !this.inset ? "" : "inset";
  }
  
  changeColor(color: string) {
    this.layer.color = color;
  }
  
  saveValue() {
    this.section.updateToken(this.token, this.group, {
      layers: this.token.layers
    });
  }

  deleteLayer() {
    this.token.layers.splice(this.index, 1);
    this.saveValue();
  }

  toggleVisibility() {
    this.isHidden = !this.isHidden
  }
}
