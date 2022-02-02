import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ColorPaletteDBToken, ColorPaletteStoreToken, Variant } from '../color-palette-section/color-palette.model';
import { EditableContent, StoreGroup, StoreToken } from '@core/core-types';
import { ColorVariantsComponent } from '@colors/color-variants/color-variants.component';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { StorageGroup } from '@core/storages/storages-types';

@Component({
  selector: 'app-color-palette-editor',
  templateUrl: './color-palette-editor.component.html',
  styleUrls: ['./color-palette-editor.component.less'],
})
export class ColorPaletteEditorComponent implements OnInit {
  @ViewChild('tintsTemplateRef') tintsTemplateRef: ColorVariantsComponent;
  @ViewChild('shadesTemplateRef') shadesTemplateRef: ColorVariantsComponent;

  @Input() content: EditableContent<ColorPaletteStoreToken, StoreGroup<StorageGroup, ColorPaletteStoreToken>>;

  contrastColor = "#fff";

  get token() {
    return this.content.token;
  }

  get group() {
    return this.content.group;
  }

  constructor(private tokens: SectionManagerTokensService<ColorPaletteDBToken, StorageGroup>) {}

  ngOnInit() {}

  changeColor(value: string) {
    this.token.color = value;

    setTimeout(() => {
      if (this.token.isPrimary) {
        this.tintsTemplateRef.changeVariantsColor();
        this.shadesTemplateRef.changeVariantsColor();
      }
    }, 50)
  }

  async saveColor() {
    await this.tokens.storage.update(this.token.id, {color: this.token.color});

    if (this.token.isPrimary) {
      this.tintsTemplateRef.saveVariantsColor();
      this.shadesTemplateRef.saveVariantsColor();
    }
  }

  async addVariant(
    color: string,
    type: Variant,
    variants: ColorPaletteStoreToken[],
    templateRef: ColorVariantsComponent
  ) {
    const token = {
      ...this.tokens.create(this.group),
      color,
      isPrimary: false,
      primaryColorId: this.token.id,
      type
    } as ColorPaletteDBToken

    await this.tokens.addToContainer(token, variants);
    templateRef.updateVariants();
  }

  async deleteVariant(
    variant: StoreToken<ColorPaletteDBToken>,
    variants: ColorPaletteStoreToken[],
    templateRef: ColorVariantsComponent,
  ) {
    await this.tokens.delete(variant, this.group);
    templateRef.updateVariants(variants.length - 1);
  }

  changeVariantColor(variant: ColorPaletteStoreToken) {
    this.tokens.update(variant, {color: variant.color});
  }
  
  getPresetColors() {
    return this.tokens.getList().filter(({id}) => id !== this.token.id)
  }

  updateConfigs(value: {[key: string]: {mixRatio: number, saturation: number}}) {
    this.tokens.update(this.token, value);
  }
}
