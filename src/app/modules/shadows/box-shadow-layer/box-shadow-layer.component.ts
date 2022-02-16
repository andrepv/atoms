import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { EditableSectionContent } from '@core/core-types';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { StorageGroup } from '@core/storages/storages-types';
import { BoxShadowLayer, BoxShadowDBToken } from '../box-shadow-section/box-shadow-section.model';

type NumericPropertyNames = keyof Omit<BoxShadowLayer, 'inset' | 'color'>;

@Component({
  selector: 'app-box-shadow-layer',
  templateUrl: './box-shadow-layer.component.html',
  styleUrls: ['./box-shadow-layer.component.less']
})
export class BoxShadowLayerComponent implements OnInit {
  @Input() content: EditableSectionContent<BoxShadowDBToken, StorageGroup>;
  @Input() layer: BoxShadowLayer;
  @Input() index: number;

  @Input() dragHandleTemplate: TemplateRef<any>;

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

  constructor(private tokens: SectionManagerTokensService<BoxShadowDBToken, StorageGroup>) {}
  
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
    this.tokens.update(this.token, {layers: this.token.layers});
  }

  deleteLayer() {
    this.token.layers.splice(this.index, 1);
    this.saveValue();
  }

  toggleVisibility() {
    this.isHidden = !this.isHidden
  }
}
