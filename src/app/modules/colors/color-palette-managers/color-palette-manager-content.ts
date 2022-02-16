import { Injectable } from "@angular/core";
import { ColorPaletteDBToken, ColorPaletteStoreToken } from "@colors/color-palette-section/color-palette.model";
import { StoreGroup } from "@core/core-types";
import SectionManagerContentService from "@core/services/section-manager-content.service";
import { StorageGroup } from "@core/storages/storages-types";

@Injectable()
export class ColorPaletteContentService extends SectionManagerContentService<ColorPaletteDBToken, StorageGroup> {

  async load() {
    await super.load();

    this.groups.getList().map(group => {

      group.tokens = group.tokens.reduce((acc, token: ColorPaletteStoreToken) => {
        if (!token.isPrimary) {
          this.attachVariantToPrimaryColor(token, group);
        }

        if (token.isPrimary) {
          if (!token.tint) token.tint = [];
          if (!token.shade) token.shade = [];

          acc.push(token);
        }
      
        return acc
      }, [])

      group.tokens = this.tokens.addCustomIterator(group.tokens);

      return group;
    })
  
    return this.groups.getList();
  }

  private attachVariantToPrimaryColor(variant: ColorPaletteStoreToken, group: StoreGroup) {
    const {primaryColorId = 0, type = 'tint'} = variant;
    const primaryColor = group.tokens.find(token => token.id === primaryColorId);

    if (primaryColor) {
      if (!primaryColor[type]) {
        primaryColor[type] = [];
      }

      primaryColor[type].push(variant);
    }
  }
}