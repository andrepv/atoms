import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { SharedModule } from '@shared/shared.module';
import { LetterSpacingEditorComponent } from './letter-spacing-editor/line-height-editor.component';
import { LetterSpacingComponent } from './letter-spacing/letter-spacing.component';
import { LineHeightEditorComponent } from './line-height-editor/line-height-editor.component';
import { LineHeightComponent } from './line-height/line-height.component';
import { TextStylesEditorComponent } from './text-styles-editor/text-styles-editor.component';
import { TextStylesComponent } from './text-styles/text-styles.component';
import { CustomFontComponent } from './typeface-editor/custom-fonts/custom-font.component';
import { GoogleFontsComponent } from './typeface-editor/google-fonts/google-fonts.component';
import { LoadedFontsComponent } from './typeface-editor/loaded-fonts/loaded-fonts.component';
import { TypefaceEditorComponent } from './typeface-editor/typeface-editor.component';
import { TypefaceComponent } from './typeface/typeface.component';
import { TypescaleEditorComponent } from './typescale-editor/typescale-editor.component';
import { TypescaleComponent } from './typescale/typescale.component';
import { TypographyComponent } from './typography.component';
import { FontManagerService } from './typeface-editor/font-manager.service';

@NgModule({
  declarations: [
    TypographyComponent,

    LetterSpacingComponent,
    LetterSpacingEditorComponent,

    LineHeightComponent,
    LineHeightEditorComponent,

    TextStylesComponent,
    TextStylesEditorComponent,

    TypefaceComponent,
    TypefaceEditorComponent,
    LoadedFontsComponent,
    GoogleFontsComponent,
    CustomFontComponent,

    TypescaleComponent,
    TypescaleEditorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ScrollingModule,
    HttpClientModule,
  ],
  exports: [
    TypographyComponent,
    LetterSpacingEditorComponent,
    LineHeightEditorComponent,
    TextStylesEditorComponent,
    TypefaceEditorComponent,
    TypescaleEditorComponent,
  ],
  providers: [FontManagerService] // TextStylesService
})
export class TypographyModule {}