import { ColorPaletteDBGroup, ColorPaletteDBToken, ColorPaletteCacheToken, Variant, VariantConfig } from '@colors/color-palette-section/color-palette.model';
import { CacheGroup } from '@core/core-types';
import { EditorService } from '@core/services/editor.service';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import chroma from 'chroma-js';

export abstract class ColorVariants {
  constructor(
    protected storage: SectionManagerTokensService,
    protected editor: EditorService<ColorPaletteDBToken, ColorPaletteDBGroup>,
  ) {}

  get primaryColorToken(): ColorPaletteCacheToken {
    return this.editor.content.token;
  }

  get group(): CacheGroup<ColorPaletteDBGroup> {
    return this.editor.content.group;
  }

  get list() {
    return this.getVariants();
  }

  get configs() {
    return this.getConfigs();
  }

  abstract mixedColor: string;
  abstract type: Variant;

  abstract getDefaultValue(): Partial<ColorPaletteDBToken>
  abstract getConfigs(): VariantConfig;
  abstract getVariants(): ColorPaletteDBToken[];

  async add() {
    const nextVariantsAmount = this.list.length + 1;
    const colorScale = this.getVariantsColorScale(nextVariantsAmount);
    const newVariantColor = colorScale[colorScale.length - 1];
    const token = this.createVariantToken(newVariantColor);
    await this.storage.add(token, this.list);
    this.recalculateColors({amount: nextVariantsAmount});
  }

  async delete() {
    const nextVariantsAmount = this.list.length - 1;
    const lastVariantToken = this.list[this.list.length - 1];
    await this.storage.delete(lastVariantToken, this.group);
    this.recalculateColors({amount: nextVariantsAmount});
  }

  updateConfigs() {
    this.recalculateColors({save: true, update: false})
  }

  async recalculateColors(configs: {
    amount?: number, save?: boolean, update?: boolean
  } = {}) {
    let {amount = this.list.length, save = true, update = true} = configs;

    this.traverseVariants((variant, color) => {
      if (update) {
        variant.color = color;
      }

      if (save) {
        this.storage.update(variant, {color: variant.color}, false);
      }
    }, amount);
  }

  private traverseVariants(
    callback: (variant: ColorPaletteCacheToken, color: string, index: number) => void,
    amount = this.list.length
  ) {
    const colorScale = this.getVariantsColorScale(amount);

    this.list.map((variant, index) => {
      let color = colorScale[index];
      if (color) {
        callback(variant, color, index);
      }
    })
  }

  private getVariantsColorScale(amount: number) {
    const primaryColor = this.getPrimaryColor();
    const mixedColor = this.getMixedColor(primaryColor)

    return this.getScale([primaryColor, mixedColor], amount);
  }

  private getPrimaryColor() {
    const primaryColor = chroma(this.primaryColorToken.color);
    const [h,s] = primaryColor.hsl();
    const minSaturation = s * 100;
    const saturation = this.configs.saturation / 100 * (100 - minSaturation) + minSaturation;
    return primaryColor.set('hsl.s', saturation / 100).hex()
  }

  private getMixedColor(primaryColor: string) {
    return chroma.mix(primaryColor, this.mixedColor, this.configs.mixRatio / 100,'rgb').hex();
  }

  private getScale(colors: string[], amount: number) {
    const scale = chroma.bezier(colors).scale().mode('lab').colors(amount + 1);
    scale.shift();
    return scale;
  }

  private createVariantToken(color: string) {
    return  {
      ...this.storage.create(this.group, {}),
      ...this.getDefaultValue(),
      color,
      primaryColorId: this.primaryColorToken.id,
    } as ColorPaletteDBToken
  }
}
