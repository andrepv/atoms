import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { ColorPaletteDBToken, ColorPaletteStoreToken, Variant } from '../color-palette-section/color-palette.model';
import { DBGroup, EditableContent, StoreGroup, StoreToken } from '@core/core.model';
import { ColorVariantsComponent } from '@colors/color-variants/color-variants.component';

@Component({
  selector: 'app-color-palette-editor',
  templateUrl: './color-palette-editor.component.html',
  styleUrls: ['./color-palette-editor.component.less'],
})
export class ColorPaletteEditorComponent implements OnInit {
  @ViewChild('tintsTemplateRef') tintsTemplateRef: ColorVariantsComponent;
  @ViewChild('shadesTemplateRef') shadesTemplateRef: ColorVariantsComponent;

  @Input() content: EditableContent<ColorPaletteStoreToken, StoreGroup<DBGroup, ColorPaletteStoreToken>>;

  contrastColor = "#fff";

  get token() {
    return this.content.token;
  }

  get group() {
    return this.content.group;
  }

  constructor(private section: SectionContentManagerService<ColorPaletteDBToken, DBGroup>) {}

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
    await this.section.tokenTable.update(this.token.id, {color: this.token.color});

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
      ...this.section.createToken(this.group.id),
      color,
      isPrimary: false,
      primaryColorId: this.token.id,
      type
    } as ColorPaletteDBToken

    await this.section.addToken(token, this.group, variants);
    templateRef.updateVariants();
  }

  async deleteVariant(
    variant: StoreToken<ColorPaletteDBToken>,
    variants: ColorPaletteStoreToken[],
    templateRef: ColorVariantsComponent,
  ) {
    await this.section.deleteToken(variant, this.group);
    templateRef.updateVariants(variants.length - 1);
  }

  changeVariantColor(variant: ColorPaletteStoreToken) {
    this.section.updateToken(variant, this.group, {
      color: variant.color
    });
  }
  
  getPresetColors() {
    return this.section.getTokens().filter(({id}) => id !== this.token.id)
  }

  updateConfigs(value: {[key: string]: {mixRatio: number, saturation: number}}) {
    this.section.updateToken(this.token, this.group, value);
  }
}
