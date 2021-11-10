import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { ColorPaletteEditorComponent } from './color-palette-editor/color-palette-editor.component';
import { ColorVariantsComponent } from './color-palette-editor/color-variants/color-variants.component';
import { ColorPaletteComponent } from './color-palette/color-palette.component';
import { ColorsComponent } from './colors.component';

@NgModule({
  declarations: [
    ColorsComponent,
    ColorPaletteComponent,
    ColorPaletteEditorComponent,
    ColorVariantsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ColorPickerModule
  ],
  exports: [
    ColorsComponent,
    ColorPaletteEditorComponent
  ]
})
export class ColorsModule {}