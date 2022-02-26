import { Injectable } from "@angular/core";
import SectionManagerTokensService from "@core/services/section-manager-tokens.service";
import { StorageGroup } from "@core/storages/storages-types";
import { BoxShadowDBToken, BoxShadowLayer } from "@shadows/box-shadow-section/box-shadow-section.model";

@Injectable()
export default class BoxShadowManagerTokensService extends SectionManagerTokensService<BoxShadowDBToken, StorageGroup> {
  readonly DEFAULT_LAYER_VALUE: BoxShadowLayer = {
    offsetX: '9px',
    offsetY: '9px',
    blur: '12px',
    spread: '0',
    color: '#9B9B9B',
    inset: ''
  }

  getDefaultValue() {
    return {
      backgroundColor: "#DCDCDC",
      blockColor: "#ffffff",
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