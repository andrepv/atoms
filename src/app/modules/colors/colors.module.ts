import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ColorPaletteEditorComponent } from './color-palette-editor/color-palette-editor.component';
import { ColorPaletteSectionComponent } from './color-palette-section/color-palette-section.component';
import { ColorsComponent } from './colors.component';
import { ColorTokenViewInlineComponent } from './color-token-view-inline/color-token-view-inline.component';
import { ColorPaletteViewDefaultComponent } from './color-palette-view-default/color-palette-view-default.component';
import { ColorPaletteViewGroupedComponent } from './color-palette-view-grouped/color-palette-view-grouped.component';
import { ColorPaletteViewInlineComponent } from './color-palette-view-inline/color-palette-view-inline.component';
import { ColorPaletteEditorTintsComponent } from './color-palette-editor-tints/color-palette-editor-tints.component';
import { ColorPaletteEditorShadesComponent } from './color-palette-editor-shades/color-palette-editor-shades.component';
import { ColorPaletteEditorVariantsComponent } from './color-palette-editor-variants/color-palette-editor-variants.component';

@NgModule({
  declarations: [
    ColorsComponent,
    ColorPaletteSectionComponent,
    ColorPaletteEditorComponent,
    ColorTokenViewInlineComponent,
    ColorPaletteViewDefaultComponent,
    ColorPaletteViewGroupedComponent,
    ColorPaletteViewInlineComponent,
    ColorPaletteEditorTintsComponent,
    ColorPaletteEditorShadesComponent,
    ColorPaletteEditorVariantsComponent,
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