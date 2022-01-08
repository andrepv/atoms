import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { SharedModule } from '@shared/shared.module';
import { TextStylesEditorComponent } from './text-styles-editor/text-styles-editor.component';
import { TextStylesSectionComponent } from './text-styles-section/text-styles-section.component';
import { TypefaceDropzoneComponent } from './typeface-dropzone/typeface-dropzone.component';
import { TypefaceListGoogleComponent } from './typeface-list-google/typeface-list-google.component';
import { TypefaceEditorComponent } from './typeface-editor/typeface-editor.component';
import { TypefaceSectionComponent } from './typeface-section/typeface-section.component';
import { TypographyComponent } from './typography.component';
import { FontManagerService } from './typeface-editor/font-manager.service';
import { TextPreviewComponent } from './text-preview/text-preview.component';

@NgModule({
  declarations: [
    TypographyComponent,

    TextStylesSectionComponent,
    TextStylesEditorComponent,

    TypefaceSectionComponent,
    TypefaceEditorComponent,

    TypefaceListGoogleComponent,
    TypefaceDropzoneComponent,

    TextPreviewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ScrollingModule,
    HttpClientModule,
  ],
  exports: [
    TypographyComponent,
    TextStylesEditorComponent,
    TypefaceEditorComponent,
  ],
  providers: [FontManagerService]
})
export class TypographyModule {}