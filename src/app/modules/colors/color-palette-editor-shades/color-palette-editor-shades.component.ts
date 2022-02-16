import { Component, Input, OnInit } from '@angular/core';
import { ColorVariants } from '@colors/color-palette-editor-variants/color-variants';
import { ColorPaletteCacheToken } from '@colors/color-palette-section/color-palette.model';
import { CacheGroup } from '@core/core-types';
import { StorageGroup } from '@core/storages/storages-types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import ColorShadesService from './color-shades.service';

@Component({
  selector: 'app-color-palette-editor-shades',
  templateUrl: './color-palette-editor-shades.component.html',
  styleUrls: ['./color-palette-editor-shades.component.less'],
  providers: [
    {
      provide: ColorVariants,
      useClass: ColorShadesService,
    },
  ]
})
export class ColorPaletteEditorShadesComponent implements OnInit {
  @Input() token: ColorPaletteCacheToken;
  @Input() group: CacheGroup<StorageGroup>;

  @Input() colorChange$: Subject<void>;
  @Input() colorSave$: Subject<void>;

  private destroy$ = new Subject();

  constructor(private variants: ColorVariants) {}

  ngOnInit() {
    this.colorChange$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.variants.recalculateColors({save: false})
    })

    this.colorSave$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.variants.recalculateColors({save: true, update: false})
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
