import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorPaletteTokenModel } from '../color-palette-section/color-palette.model';
import { StoreToken } from '@core/core.model';

import chroma from "chroma-js";

type Configs = {mixRatio: number, saturation: number}

@Component({
  selector: 'app-color-variants',
  templateUrl: './color-variants.component.html',
  styleUrls: ['./color-variants.component.less'],
})
export class ColorVariantsComponent implements OnInit {
  @Input() primaryColor: string;
  @Input() mixedColor: string;

  @Input() variants: StoreToken<ColorPaletteTokenModel>[] = [];
  @Input() mixRatio = 50;
  @Input() saturation = 1;

  @Output() changeVariantColor: EventEmitter<StoreToken<ColorPaletteTokenModel>> = new EventEmitter();
  @Output() deleteVariant: EventEmitter<StoreToken<ColorPaletteTokenModel>> = new EventEmitter();
  @Output() addVariant: EventEmitter<string> = new EventEmitter()
  @Output() updateVariantConfigs: EventEmitter<Configs> = new EventEmitter()

  constructor() {}

  ngOnInit() {}

  add() {
    const variants = this.getVariants(this.variants.length + 1);
    this.addVariant.emit(variants[variants.length - 1]);
  }

  delete() {
    const lastVariant = this.variants[this.variants.length - 1];
    this.deleteVariant.emit(lastVariant)
  }

  updateVariants(amount = this.variants.length) {
    this.getVariant((variant, color) => {
      variant.color = color
      this.changeVariantColor.emit(variant);
    }, amount);
  }

  changeVariantsColor() {
    this.getVariant((variant, color) => variant.color = color)
  }

  saveVariantsColor() {
    this.getVariant(variant => this.changeVariantColor.emit(variant))
  }

  saveConfigs() {
    this.saveVariantsColor();

    this.updateVariantConfigs.emit({
      saturation: this.saturation,
      mixRatio: this.mixRatio,
    })
  }

  getVariant(
    callback: (variant: any, color: string, index: number) => void,
    amount = this.variants.length
  ) {
    const colors = this.getVariants(amount);

    this.variants.map((variant: any, index) => {
      if (colors[index]) {
        callback(variant, colors[index], index);
      }
    })
  }

  private getVariants(amount: number) {
    const primaryColor = this.getPrimaryColor();
    const mixedColor = this.getMixedColor(primaryColor)

    return this.getScale([primaryColor, mixedColor], amount);
  }

  private getPrimaryColor() {
    const primaryColor = chroma(this.primaryColor);
    const [h,s] = primaryColor.hsl();
    const minSaturation = s * 100;
    const saturation = this.saturation / 100 * (100 - minSaturation) + minSaturation;
    return primaryColor.set('hsl.s', saturation / 100).hex()
  }

  private getMixedColor(primaryColor: string) {
    return chroma.mix(primaryColor, this.mixedColor, this.mixRatio / 100,'rgb').hex();
  }

  private getScale(colors: string[], amount: number) {
    const scale = chroma.bezier(colors).scale().mode('lab').colors(amount + 1);
    scale.shift();
    return scale;
  }
}
