import { Injectable } from "@angular/core";
import { ColorPaletteDBToken, ColorPaletteStoreToken } from "@colors/color-palette-section/color-palette.model";
import { StoreGroup } from "@core/core-types";
import SectionManagerContentService from "@core/services/section-manager-content.service";
import { StorageGroup } from "@core/storages/storages-types";

@Injectable()
export class ColorPaletteContentService extends SectionManagerContentService<ColorPaletteDBToken, StorageGroup> {

  async load() {
    const groups = await super.load();

    this.groups.getList().map(group => {
      group.tokens.map(token => this.handleTokenLoad(token, group))
      group.tokens = group.tokens.filter(token => token.isPrimary)
    })
  
    return groups;
  }

  private handleTokenLoad(token: ColorPaletteStoreToken, group: StoreGroup) {
    if (!token.isPrimary) {
      const {primaryColorId = 0, type = 'tint'} = token;
      const primaryColor = this.getToken(group, primaryColorId);

      if (primaryColor) {
        if (!primaryColor[type]) {
          primaryColor[type] = [];
        }

        primaryColor[type].push(token)
      }
    }

    if (token.isPrimary) {
      if (!token.tint) token.tint = [];
      if (!token.shade) token.shade = [];
    }
  
    return token;
  }

  private getToken(group: StoreGroup, tokenId: number) {
    return group.tokens.find(token => token.id === tokenId)
  }
}