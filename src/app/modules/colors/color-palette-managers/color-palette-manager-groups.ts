import { Injectable } from "@angular/core";
import { ColorPaletteDBGroup, ColorPaletteDBToken } from "@colors/color-palette-section/color-palette.model";
import { StoreGroup, StoreToken } from "@core/core-types";
import SectionManagerGroupsService from "@core/services/section-manager-groups.service";

@Injectable()
export default class ColorPaletteManagerGroupsService extends SectionManagerGroupsService<ColorPaletteDBToken, ColorPaletteDBGroup> {

  getDefaultValue() {
    const view: ColorPaletteDBGroup['view'] = "default";
    return { view }
  }

  protected async duplicateTokens(
    group: StoreGroup<ColorPaletteDBGroup>,
    tokens: StoreToken<ColorPaletteDBToken>[]
  ) {
    for (let token of tokens) {
      if (token.isPrimary) {
        await this.tokensManager.duplicate(token, group)
      }
    }
  }
}