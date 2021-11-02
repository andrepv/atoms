import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { EditorService } from '../../layout/editor/editor.service';
import { ColorVariantField, Variant } from '../../sections/color-palette/color-palette.model';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';
import { StoreService } from '../../services/store.service';
import { AddVariantEvent, RemoveVariantEvent, VariantValueChangeEvent } from './color-variants/color-variants.component';

@Component({
  selector: 'app-color-palette-editor',
  templateUrl: './color-palette-editor.component.html',
  styleUrls: ['./color-palette-editor.component.less'],
  providers: [
    {provide: 'tables', useValue: db.colorPalette},
    ContentManagerService,
  ]
})
export class ColorPaletteEditorComponent implements OnInit {
  color = this.token.value.color;
  
  get token() {
    return this.editor.content.token;
  }

  get group() {
    return this.editor.content.group;
  }

  private colorChange$ = new BehaviorSubject('');
  private destroy$ = new Subject();

  readonly DEBOUNCE_TIME = 500;

  constructor(
    public cm: ContentManagerService,
    public editor: EditorService,
    private store: StoreService,
  ) {
    this.colorChange$.pipe(
      takeUntil(this.destroy$),
      debounceTime(this.DEBOUNCE_TIME),
      distinctUntilChanged(),
      tap(color => this.saveColor(color)),
    ).subscribe();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onColorChange(value: string) {
    this.colorChange$.next(value);
  }

  saveColor(color: string) {
    if (color) {
      this.token.value.color = color;
      this.cm.setTokenValue(this.token.value, this.token.id, this.group.id);
    }
  }

  getVariants(variant: ColorVariantField) {
    const ids = this.token.value[variant];
    if (!ids) return [];
    return this.store.getGroup(
      this.cm.sectionName,
      this.group.id
    ).tokens.filter(({id}) => ids.includes(id))
  }

  async addVariant({color, type}: AddVariantEvent) {
    const token = await this.saveVariantToken(color, type);
    return this.addVariantToPrimaryColor(token.id, type);
  }

  removeVariant({id, type}: RemoveVariantEvent) {
    const fieldName = `${type}s`;
    const tokenValue = this.token.value;

    this.cm.deleteToken(id, this.group.id);
    tokenValue[fieldName] = tokenValue[fieldName].filter((variantId: number) => id !== variantId);
    this.cm.setTokenValue(tokenValue, this.token.id, this.group.id);
  }

  updateVariant({id, color}: VariantValueChangeEvent) {
    const token = this.store.getSectionToken(this.cm.sectionName, id);
    if (token) {
      token.value.color = color;
      this.cm.setTokenValue(token.value, id, this.group.id)
    }
  }

  private async saveVariantToken(color: string, type: Variant) {
    const tokenValue = {
      color: color,
      isPrimary: false,
      primaryColorId: this.token.id,
      type 
    }

    const token = this.cm.createToken(this.group.id, tokenValue);
    await this.cm.addToken(token, this.group.id);
    return token;
  }

  private addVariantToPrimaryColor(tokenId: number, type: Variant) {
    const fieldName = `${type}s`;
    const tokenValue = this.token.value;
    if (!tokenValue[fieldName]) tokenValue[fieldName] = [];
    tokenValue[fieldName].push(tokenId);

    return this.cm.setTokenValue(tokenValue, this.token.id, this.group.id);
  }
}
