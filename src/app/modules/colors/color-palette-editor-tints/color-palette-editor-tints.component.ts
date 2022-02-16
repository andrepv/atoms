import { Component, Input, OnInit } from '@angular/core';
import { ColorVariants } from '@colors/color-palette-editor-variants/color-variants';
import { ColorPaletteStoreToken } from '@colors/color-palette-section/color-palette.model';
import { StoreGroup } from '@core/core-types';
import { StorageGroup } from '@core/storages/storages-types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import ColorTintsService from './color-tints.service';

@Component({
  selector: 'app-color-palette-editor-tints',
  templateUrl: './color-palette-editor-tints.component.html',
  styleUrls: ['./color-palette-editor-tints.component.less'],
  providers: [
    {
      provide: ColorVariants,
      useClass: ColorTintsService,
    },
  ]
})
export class ColorPaletteEditorTintsComponent implements OnInit {
  @Input() token: ColorPaletteStoreToken;
  @Input() group: StoreGroup<StorageGroup>;

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
