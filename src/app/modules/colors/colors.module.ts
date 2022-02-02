import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ColorPaletteEditorComponent } from './color-palette-editor/color-palette-editor.component';
import { ColorVariantsComponent } from './color-variants/color-variants.component';
import { ColorPaletteSectionComponent } from './color-palette-section/color-palette-section.component';
import { ColorsComponent } from './colors.component';
import { ColorTokenViewInlineComponent } from './color-token-view-inline/color-token-view-inline.component';
import { ColorPaletteViewDefaultComponent } from './color-palette-view-default/color-palette-view-default.component';
import { ColorPaletteViewGroupedComponent } from './color-palette-view-grouped/color-palette-view-grouped.component';
import { ColorPaletteViewInlineComponent } from './color-palette-view-inline/color-palette-view-inline.component';

@NgModule({
  declarations: [
    ColorsComponent,
    ColorPaletteSectionComponent,
    ColorPaletteEditorComponent,
    ColorVariantsComponent,
    ColorTokenViewInlineComponent,
    ColorPaletteViewDefaultComponent,
    ColorPaletteViewGroupedComponent,
    ColorPaletteViewInlineComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    ColorsComponent,
    ColorPaletteEditorComponent
  ]
})
export class ColorsModule {}