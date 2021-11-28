import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { from, Subject } from 'rxjs';
import { debounceTime, map, mergeMap, takeUntil } from 'rxjs/operators';
// @ts-ignore
import Values from 'values.js';
import { EditorService } from '@core/services/editor.service';
import { ColorPaletteTokenModel, Variant as VariantType } from '../color-palette-section/color-palette.model';
import { DBGroup, EditableContent } from '@core/core.model';

export type AddVariantEvent = {color: string, type: VariantType};
export type RemoveVariantEvent = {id: number, type: VariantType};
export type VariantValueChangeEvent = {id: number, color: string};
type Variant = {id?: number, value: string};

@Component({
  selector: 'app-color-variants',
  templateUrl: './color-variants.component.html',
  styleUrls: ['./color-variants.component.less'],
})
export class ColorVariantsComponent implements OnInit {
  @Input() set primaryColor(value: string) {
    if (value) {
      this._primaryColor = new Values(value);
      this.updateVariantsValue();
    }
  };

  @Input() type: VariantType;
  @Input() variants: ColorPaletteTokenModel[];
  @Input() debounceTime: number;

  @Input() set editableContent(content: EditableContent) {
    const variants = content.token.value[`${this.type}s`];

    if (!this.editableTokenId) {
      this.editableTokenId = content.token.id
    }

    if (variants && variants.length < this._variants.length) {
      this.setState();
    }

    if (content.token.id !== this.editableTokenId) {
      this.onEditableTokenChange(content);
    }
  };

  @Output() onAddVariant: EventEmitter<AddVariantEvent> = new EventEmitter();
  @Output() onRemoveVariant: EventEmitter<RemoveVariantEvent> = new EventEmitter();
  @Output() onColorChange: EventEmitter<VariantValueChangeEvent> = new EventEmitter();

  readonly MAX_VARIANTS = 10;
  readonly MIN_VARIANTS = 0;

  variantCount = this.MIN_VARIANTS;
  _variants: Variant[] = [];
  
  private variantCountChange$ = new Subject<Variant[]>();
  private variantValueChange$ = new Subject<Variant[]>();
  private destroy$ = new Subject();

  private _prevVariantCount = this.variantCount;
  private _primaryColor: Values;
  private editableTokenId: number;

  constructor(public editor: EditorService<ColorPaletteTokenModel, DBGroup>) {}

  ngOnInit() {
    this.setState();

    this.variantCountChange$.pipe(
      takeUntil(this.destroy$),
      debounceTime(this.debounceTime),
      map(variants => this.emitData(variants)),
    ).subscribe();

    this.variantValueChange$.pipe(
      takeUntil(this.destroy$),
      debounceTime(this.debounceTime),
      mergeMap(variants => from(variants)),
      map(variant => this.onColorChange.emit({
        id: variant.id,
        color: variant.value,
      }))
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeVariantCount() {
    const diff = this.variantCount - this._prevVariantCount;
    if (diff > 0) {
      this.pushVariant();
    } else if (diff < 0) {
      this.popVariant()
    }

    this._prevVariantCount = this.variantCount
  }

  private pushVariant() {
    for (let i = 0; i < this.variantCount; i++) {
      const variant = this._variants[i];
      const value = this.getVariantValue(i + 1);
      if (variant) {
        variant.value = value;
      } else {
        this._variants.push({value});
      }
    }

    this.variantCountChange$.next(this._variants);
    this.variantValueChange$.next(this._variants);
  }

  private popVariant() {
    this._variants.pop();
    this.variantCountChange$.next(this._variants);
  }

  private updateVariantsValue() {
    if (!this.editableTokenId) return;

    for (let i = 0; i < this.variantCount; i++) {
      const variant = this._variants[i];
      const value = this.getVariantValue(i + 1);
      if (!variant.id) {
        if (variant.value === this.variants[i].value.color) {
          variant.id = this.variants[i].id;
        }
      }
      variant.value = value;
    }
    this.variantValueChange$.next(this._variants)
  }

  private emitData(variants: Variant[]) {
    if (variants.length > this.variants.length) {
      const variantsToAdd = variants.slice(this.variants.length - variants.length);

      for (let variant of variantsToAdd) {
        this.onAddVariant.emit({color: variant.value, type: this.type})
      }

      return;
    }
    
    if (variants.length < this.variants.length) {
      const variantsToRemove = this.variants.slice(variants.length - this.variants.length);

      for (let variant of variantsToRemove) {
        this.onRemoveVariant.emit({id: variant.id, type: this.type})
      }
    }
  }

  private getVariantValue(index: number) {
    const value = this._primaryColor[this.type](index * 10);
    return `rgba(${value.rgb},${value.alpha})`;
  }

  private getVariants(variants = this.variants): Variant[] {
    return variants.map(({value, id}) => ({id, value: value.color}));
  }

  private setState() {
    this.variantCount = this.variants.length;
    this._prevVariantCount = this.variantCount;
    this._variants = this.getVariants();
  }

  private onEditableTokenChange(content: EditableContent) {
    this.editableTokenId = content.token.id;
    this._primaryColor = new Values(content.token.value.color);
    this.setState();
  }
}
