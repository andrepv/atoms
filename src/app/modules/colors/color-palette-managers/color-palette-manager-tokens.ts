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

  async delete(
    token: StoreToken<ColorPaletteDBToken>,
    group: StoreGroup<StorageGroup, ColorPaletteDBToken>
  ) {
    await super.delete(token, group);

    if (!token.isPrimary) {
      this.deleteVariant(token, group);
    } else {
      this.deletePrimaryColor(token, group);
    }
  }

  addToGroup(
    group: StoreGroup<StorageGroup>,
    token = this.create(group)
  ) {
    return this.addPrimaryColor(token, group);
  }

  async duplicate(
    token: ColorPaletteStoreToken,
    group: StoreGroup<StorageGroup, ColorPaletteDBToken>
  ) {
    let duplicate = this.getDuplicate(token, group) as ColorPaletteStoreToken;

    if (duplicate.tint || duplicate.shade) {
      return this.duplicatePrimaryColor(duplicate, group);
    }

    return this.addPrimaryColor(duplicate, group);
  }

  getStyleValue(token: ColorPaletteDBToken) {
    return token.color;
  }

  addCustomIterator(tokens: StoreToken<ColorPaletteDBToken>[]) {
    tokens[Symbol.iterator] = function* () {
      for (let i of Object.values(this)) {
        const token = i as ColorPaletteStoreToken;

        if (token.isPrimary) {
          for (let i = token.tint.length - 1; i >= 0; i--) {
            yield token.tint[i]
          }

          yield token;

          for (let shade of token.shade) {
            yield shade;
          }
        }
      }
    }

    return [...tokens];
  }

  async add(token: ColorPaletteDBToken, container: any[]) {
    const nextToken = await super.add(token, container);
    const group = this.store.getGroup(this.sectionName, nextToken.groupId);
    group.tokens = this.addCustomIterator(group.tokens);
    return nextToken;
  }

  protected getDuplicate(
    originalToken: ColorPaletteStoreToken,
    group: StoreGroup<StorageGroup, ColorPaletteDBToken>
  ) {
    let duplicate = super.getDuplicate(originalToken, group);

    if (!duplicate.isPrimary) {
      duplicate = this.transformVariantToPrimaryColor(duplicate);
    }

    return duplicate;
  }

  private deleteVariant(
    token: ColorPaletteStoreToken,
    group: StoreGroup
  ) {
    const primaryColor = group.tokens.find(primaryColorToken => primaryColorToken.id === token.primaryColorId);

    if (primaryColor) {
      primaryColor[token.type] = primaryColor[token.type].filter((variant: StoreToken) => variant.id !== token.id)
    }
  }

  private deletePrimaryColor(
    token: ColorPaletteStoreToken,
    group: StoreGroup<StorageGroup, ColorPaletteDBToken>
  ) {
    token.tint.map(token => super.delete(token, group))
    token.shade.map(token => super.delete(token, group))
  }

  private transformVariantToPrimaryColor(clonedVariant: ColorPaletteStoreToken) {

    delete clonedVariant.type;
    delete clonedVariant.primaryColorId;

    return {
      ...clonedVariant,
      ...this.getDefaultValue(),
      color: clonedVariant.color
    }
  }

  private async duplicatePrimaryColor(
    token: ColorPaletteStoreToken,
    group: StoreGroup<StorageGroup>
  ) {
    let {tint: tints, shade: shades} = token;

    delete token.tint;
    delete token.shade;

    const duplicate = await this.addPrimaryColor(token, group);

    for (let tint of tints) {
      tint.primaryColorId = duplicate.id;
      await this.add(super.getDuplicate(tint, group), duplicate.tint)
    }

    for (let shade of shades) {
      shade.primaryColorId = duplicate.id;
      await this.add(super.getDuplicate(shade, group), duplicate.shade)
    }

    return duplicate;
  }

  private async addPrimaryColor(
    token: ColorPaletteStoreToken,
    group: StoreGroup<StorageGroup>
  ) {
    const newToken: any = await super.add(token, group.tokens);

    newToken.tint = [];
    newToken.shade = [];

    return newToken;
  }
}