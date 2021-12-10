import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { ColorPaletteTokenModel, Variant } from '../color-palette-section/color-palette.model';
import { DBGroup, EditableContent, StoreToken } from '@core/core.model';
import { ColorVariantsComponent } from '@colors/color-variants/color-variants.component';

@Component({
  selector: 'app-color-palette-editor',
  templateUrl: './color-palette-editor.component.html',
  styleUrls: ['./color-palette-editor.component.less'],
})
export class ColorPaletteEditorComponent implements OnInit {
  @ViewChild('tintsTemplateRef') tintsTemplateRef: ColorVariantsComponent;
  @ViewChild('shadesTemplateRef') shadesTemplateRef: ColorVariantsComponent;

  @Input() content: EditableContent<DBGroup, ColorPaletteTokenModel>;

  get token(): any {
    return this.content.token;
  }

  get group(): any {
    return this.content.group;
  }

  constructor(private section: SectionContentManagerService<ColorPaletteTokenModel, DBGroup>) {}

  ngOnInit() {}

  changeColor(value: string,) {
    this.token.color = value;

    this.tintsTemplateRef.changeVariantsColor();
    this.shadesTemplateRef.changeVariantsColor();
  }

  async saveColor() {
    await this.section.tokenTable.update(this.token.id, {color: this.token.color});

    this.tintsTemplateRef.saveVariantsColor();
    this.shadesTemplateRef.saveVariantsColor();
  }

  async addVariant(
    color: string,
    type: Variant,
    variants: StoreToken<any>[],
    templateRef: ColorVariantsComponent
  ) {
    const token = {
      ...this.section.createToken(this.group.id),
      color,
      isPrimary: false,
      primaryColorId: this.token.id,
      type
    }

    await this.section.addToken(token, this.group, variants);
    templateRef.updateVariants();
  }

  async deleteVariant(
    variant: StoreToken<ColorPaletteTokenModel>,
    variants: StoreToken<any>[],
    templateRef: ColorVariantsComponent,
  ) {
    await this.section.deleteToken(variant, this.group);
    templateRef.updateVariants(variants.length - 1);
  }

  changeVariantColor(variant: any) {
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
