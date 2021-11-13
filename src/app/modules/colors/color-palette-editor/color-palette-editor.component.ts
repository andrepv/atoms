import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { EditorService } from '@core/services/editor.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { ColorPaletteTokenModel, ColorVariantField, Variant } from '../color-palette/color-palette.model';
import { db } from '@core/indexedDB';
import { ThemeManagerService } from '@core/services/theme-manager.service';
import { AddVariantEvent, RemoveVariantEvent, VariantValueChangeEvent } from './color-variants/color-variants.component';
import { DBGroup, DBToken } from '@core/core.model';

@Component({
  selector: 'app-color-palette-editor',
  templateUrl: './color-palette-editor.component.html',
  styleUrls: ['./color-palette-editor.component.less'],
  providers: [
    {provide: 'tables', useValue: db.colorPalette},
    SectionContentManagerService,
  ]
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

  palettes: {themeName: string, list: DBToken[]}[] = [];

  readonly DEBOUNCE_TIME = 500;

  private colorChange$ = new BehaviorSubject('');
  private destroy$ = new Subject();

  constructor(
    public editor: EditorService<ColorPaletteTokenModel, DBGroup>,
    private section: SectionContentManagerService<ColorPaletteTokenModel, DBGroup>,
    private themeManager: ThemeManagerService
  ) {
    this.colorChange$.pipe(
      takeUntil(this.destroy$),
      debounceTime(this.DEBOUNCE_TIME),
      distinctUntilChanged(),
      tap(color => this.saveColor(color)),
    ).subscribe();

    this.editor.content$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.color = this.token.value.color;
    });
  }

  async ngOnInit() {
    this.palettes = await this.getAllPalettes();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onColorChange(value: string) {
    this.colorChange$.next(value);
    this._color = this.color;
  }

  saveColor(color: string) {
    if (color) {
      this.token.value.color = color;
      this.section.setTokenValue(this.token.value, this.token.id, this.group.id);
    }
  }

  getVariants(variant: ColorVariantField) {
    const ids = this.token.value[variant];
    if (!ids) return [];
    return this.section.getGroup(this.group.id).tokens.filter(({id}) => ids.includes(id))
  }

  getPresetColors() {
    return this.section.getTokenList()
    .filter(({id}) => id !== this.token.id)
    .map(token => token.value.color)
  }

  setColor(value: string) {
    this.color = value;
    this.onColorChange(value);
  }

  async getAllPalettes() {
    const tokens = await this.section.tokenTable.toArray();
    const themes = this.themeManager.list;
    const palettes = [];

    for (let theme of themes) {
      if (theme.id !== this.themeManager.selected.id) {
        const palette = tokens.filter(token => token.themeId === theme.id);
        if (palette.length) {
          palettes.push({themeName: theme.name, list: palette})
        }
      }
    }

    return palettes;
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