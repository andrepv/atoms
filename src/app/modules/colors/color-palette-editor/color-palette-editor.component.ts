import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditorService } from '@core/services/editor.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { ColorPaletteTokenModel, COLORPALETTE_DB_DATA, ColorVariantField, Variant } from '../color-palette/color-palette.model';
import { AddVariantEvent, RemoveVariantEvent, VariantValueChangeEvent } from './color-variants/color-variants.component';
import { DBGroup } from '@core/core.model';
import { provideEditorDeps } from '@utils/provide-editor-deps';

@Component({
  selector: 'app-color-palette-editor',
  templateUrl: './color-palette-editor.component.html',
  styleUrls: ['./color-palette-editor.component.less'],
  providers: [...provideEditorDeps(COLORPALETTE_DB_DATA.tableGroupName)]
})
export class ColorPaletteEditorComponent implements OnInit {
  color = this.token.value.color;
  _color = this.color;
  
  get token() {
    return this.editor.content.token;
  }

  get group() {
    return this.editor.content.group;
  }

  readonly DEBOUNCE_TIME = 500;

  private destroy$ = new Subject();

  constructor(
    public editor: EditorService<ColorPaletteTokenModel, DBGroup>,
    private section: SectionContentManagerService<ColorPaletteTokenModel, DBGroup>,
  ) {
    this.editor.content$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.color = this.token.value.color;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onColorChange(value: string) {
    this.color = value;
    this._color = this.color;
  }

  saveColor(color: string) {
    this.token.value.color = color;
    this.section.setTokenValue(this.token.value, this.token.id, this.group.id);
  }

  getVariants(variant: ColorVariantField) {
    const ids = this.token.value[variant];
    if (!ids) return [];
    return this.section.getGroup(this.group.id).tokens.filter(({id}) => ids.includes(id))
  }

  getPresetColors() {
    return this.section.getTokens().filter(({id}) => id !== this.token.id)
  }

  async addVariant({color, type}: AddVariantEvent) {
    const token = await this.saveVariantToken(color, type);
    return this.addVariantToPrimaryColor(token.id, type);
  }

  removeVariant({id, type}: RemoveVariantEvent) {
    const fieldName = `${type}s`;
    const tokenValue = this.token.value;

    this.section.deleteToken(id, this.group.id);
    tokenValue[fieldName] = tokenValue[fieldName].filter((variantId: number) => id !== variantId);
    this.section.setTokenValue(tokenValue, this.token.id, this.group.id);
  }

  updateVariant({id, color}: VariantValueChangeEvent) {
    const token = this.section.getToken(id);
    if (token) {
      token.value.color = color;
      this.section.setTokenValue(token.value, id, this.group.id)
    }
  }

  private async saveVariantToken(color: string, type: Variant) {
    const tokenValue = {
      color: color,
      isPrimary: false,
      primaryColorId: this.token.id,
      type 
    }

    const token = this.section.createToken(this.group.id, tokenValue);
    const {id} = await this.section.addToken(token, this.group.id);
    return {id, ...token};
  }

  private addVariantToPrimaryColor(tokenId: number, type: Variant) {
    const fieldName = `${type}s`;
    const tokenValue = this.token.value;
    if (!tokenValue[fieldName]) tokenValue[fieldName] = [];
    tokenValue[fieldName].push(tokenId);

    return this.section.setTokenValue(tokenValue, this.token.id, this.group.id);
  }
}
