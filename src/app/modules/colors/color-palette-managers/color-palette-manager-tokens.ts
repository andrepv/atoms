import { Injectable } from "@angular/core";
import { ColorPaletteDBToken, ColorPaletteStoreToken } from "@colors/color-palette-section/color-palette.model";
import { StoreGroup, StoreToken } from "@core/core-types";
import SectionManagerTokensService from "@core/services/section-manager-tokens.service";
import { StorageGroup } from "@core/storages/storages-types";
import chroma from "chroma-js";

@Injectable()
export default class ColorPaletteManagerTokensService extends SectionManagerTokensService<ColorPaletteDBToken, StorageGroup> {
  getDefaultValue() {
    return {
      color: chroma.random().hex(),
      isPrimary: true,
      tintConfigs: {mixRatio: 80, saturation: 1},
      shadeConfigs: {mixRatio: 80, saturation: 1}
    }
  }

  async delete(token: StoreToken<ColorPaletteDBToken>, group: StoreGroup<StorageGroup, ColorPaletteDBToken>) {
    await super.delete(token, group);

    if (!token.isPrimary) {
      this.deleteVariant(token, group);
    }

    if (token.isPrimary) {
      this.deletePrimaryColor(token, group)
    }
  }

  async addToGroup(group: StoreGroup<StorageGroup>, token = this.create(group)) {
    const newToken: any = await super.add(token, group.tokens);

    if (newToken && newToken.isPrimary) {
      newToken.tint = [];
      newToken.shade = [];
    }

    return newToken;
  }

  private deleteVariant(token: ColorPaletteStoreToken, group: StoreGroup) {
    const {type, primaryColorId} = token;
    const primaryColor = this.getToken(group, primaryColorId);

    if (primaryColor) {
      primaryColor[type] = primaryColor[type].filter((variant: StoreToken) => variant.id !== token.id)
    }
  }

  private deletePrimaryColor(token: ColorPaletteStoreToken, group: StoreGroup<StorageGroup, ColorPaletteDBToken>) {
    token.tint.map(token => {
      this.delete(token, group)
    })
    token.shade.map(token => {
      this.delete(token, group)
    })
  }

  private getToken(group: StoreGroup, tokenId: number) {
    return group.tokens.find(token => token.id === tokenId)
  }

  getStyleValue(token: ColorPaletteDBToken) {
    return token.color;
  }
}