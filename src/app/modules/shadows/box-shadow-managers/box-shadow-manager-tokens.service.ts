import { Injectable } from "@angular/core";
import SectionManagerTokensService from "@core/services/section-manager-tokens.service";
import { StorageGroup } from "@core/storages/storages-types";
import { BoxShadowDBToken, BoxShadowLayer } from "@shadows/box-shadow-section/box-shadow-section.model";

@Injectable()
export default class BoxShadowManagerTokensService extends SectionManagerTokensService<BoxShadowDBToken, StorageGroup> {
  readonly DEFAULT_LAYER_VALUE: BoxShadowLayer = {
    offsetX: '17px',
    offsetY: '17px',
    blur: '12px',
    spread: '2px',
    color: '#2e475a',
    inset: ''
  }

  getDefaultValue() {
    return {
      backgroundColor: "#ffffff",
      blockColor: "#2d2d2d",
      layers: [this.DEFAULT_LAYER_VALUE]
    }
  }

  getStyleValue(token: BoxShadowDBToken) {
    return token.layers.reduce((accumulator, layers, index) => {
      let values = Object.values(layers);

      if (!values[values.length - 1]) {
        values.pop();
      }

      let comma = index + 1 !== token.layers.length ? ',' : '';
      accumulator += values.join(' ');

      return accumulator + comma
    }, "")
  }
}