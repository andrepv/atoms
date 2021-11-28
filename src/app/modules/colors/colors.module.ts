import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ColorPaletteEditorComponent } from './color-palette-editor/color-palette-editor.component';
import { ColorVariantsComponent } from './color-variants/color-variants.component';
import { ColorPaletteSectionComponent } from './color-palette-section/color-palette-section.component';
import { ColorsComponent } from './colors.component';

@NgModule({
  declarations: [
    ColorsComponent,
    ColorPaletteSectionComponent,
    ColorPaletteEditorComponent,
    ColorVariantsComponent
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