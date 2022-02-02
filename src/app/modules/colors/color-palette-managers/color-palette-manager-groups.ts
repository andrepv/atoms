import { Injectable } from "@angular/core";
import { ColorPaletteDBGroup, ColorPaletteDBToken } from "@colors/color-palette-section/color-palette.model";
import SectionManagerGroupsService from "@core/services/section-manager-groups.service";

@Injectable()
export default class ColorPaletteManagerGroupsService extends SectionManagerGroupsService<ColorPaletteDBToken, ColorPaletteDBGroup> {

  getDefaultValue() {
    const view: ColorPaletteDBGroup['view'] = "default";
    return { view }
  }
}