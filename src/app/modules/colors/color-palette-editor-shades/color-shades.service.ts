import { Injectable } from "@angular/core";
import { ColorVariants } from "@colors/color-palette-editor-variants/color-variants";
import { Variant, ColorPaletteDBToken, ColorPaletteDBGroup } from "@colors/color-palette-section/color-palette.model";
import { SectionContentEditorService } from "@core/services/section-content-editor.service";
import SectionManagerTokensService from "@core/services/section-manager-tokens.service";

@Injectable()
export default class ColorShadesService extends ColorVariants {
  mixedColor = "black";
  type: Variant = "shade";

  constructor(
    protected storage: SectionManagerTokensService,
    protected editor: SectionContentEditorService<ColorPaletteDBToken, ColorPaletteDBGroup>
  ) {
    super(storage, editor)
  }

  getConfigs() {
    return this.primaryColorToken.shadeConfigs;
  }

  updateConfigs() {
    super.updateConfigs();

    this.storage.update(this.primaryColorToken, {
      shadeConfigs: {
        saturation: this.configs.saturation,
        mixRatio: this.configs.mixRatio,
      }
    });
  }

  getVariants() {
    return this.primaryColorToken.shade;
  }

  getDefaultValue(): any {
    return {
      isPrimary: false,
      type: "shade"
    }
  }
}