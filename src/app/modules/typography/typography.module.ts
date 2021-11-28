import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { SharedModule } from '@shared/shared.module';
import { LetterSpacingEditorComponent } from './letter-spacing-editor/letter-spacing-editor.component';
import { LetterSpacingSectionComponent } from './letter-spacing-section/letter-spacing-section.component';
import { LineHeightEditorComponent } from './line-height-editor/line-height-editor.component';
import { LineHeightSectionComponent } from './line-height-section/line-height-section.component';
import { TextStylesEditorComponent } from './text-styles-editor/text-styles-editor.component';
import { TextStylesSectionComponent } from './text-styles-section/text-styles-section.component';
import { TypefaceDropzoneComponent } from './typeface-dropzone/typeface-dropzone.component';
import { TypefaceListGoogleComponent } from './typeface-list-google/typeface-list-google.component';
import { TypefaceListComponent } from './typeface-list/typeface-list.component';
import { TypefaceEditorComponent } from './typeface-editor/typeface-editor.component';
import { TypefaceSectionComponent } from './typeface-section/typeface-section.component';
import { TypescaleEditorComponent } from './typescale-editor/typescale-editor.component';
import { TypescaleSectionComponent } from './typescale-section/typescale-section.component';
import { TypographyComponent } from './typography.component';
import { FontManagerService } from './typeface-editor/font-manager.service';
import { TextPreviewComponent } from './text-preview/text-preview.component';
import { TextPreviewService } from './text-preview/text-preview.service';
import { TextStylesTokenComponent } from './text-styles-token/text-styles-token.component';

@NgModule({
  declarations: [
    TypographyComponent,

    LetterSpacingSectionComponent,
    LetterSpacingEditorComponent,

    LineHeightSectionComponent,
    LineHeightEditorComponent,

    TextStylesSectionComponent,
    TextStylesEditorComponent,

    TypefaceSectionComponent,
    TypefaceEditorComponent,
    TypefaceListComponent,
    TypefaceListGoogleComponent,
    TypefaceDropzoneComponent,

    TypescaleSectionComponent,
    TypescaleEditorComponent,

    TextPreviewComponent,

    TextStylesTokenComponent
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
  providers: [FontManagerService, TextPreviewService]
})
export class TypographyModule {}