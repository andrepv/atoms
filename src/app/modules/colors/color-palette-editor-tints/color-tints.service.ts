import { Injectable } from "@angular/core";
import { ColorVariants } from "@colors/color-palette-editor-variants/color-variants";
import { ColorPaletteDBGroup, ColorPaletteDBToken, Variant } from "@colors/color-palette-section/color-palette.model";
import { SectionContentEditorService } from "@core/services/section-content-editor.service";
import SectionManagerTokensService from "@core/services/section-manager-tokens.service";

@Injectable()
export default class ColorTintsService extends ColorVariants {
  mixedColor = "white";
  type: Variant = "tint";

  constructor(
    protected storage: SectionManagerTokensService,
    protected editor: SectionContentEditorService<ColorPaletteDBToken, ColorPaletteDBGroup>
  ) {
    super(storage, editor)
  }

  getConfigs() {
    return this.primaryColorToken.tintConfigs;
  }

  updateConfigs() {
    super.updateConfigs();

    this.storage.update(this.primaryColorToken, {
      tintConfigs: {
        saturation: this.configs.saturation,
        mixRatio: this.configs.mixRatio,
      }
    });
  }

  getVariants() {
    return this.primaryColorToken.tint;
  }

  getDefaultValue(): any {
    return {
      isPrimary: false,
      type: "tint"
    }
  }
}