import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ColorPickerModule } from 'ngx-color-picker';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { BoxShadowEditorComponent } from './box-shadow-editor/box-shadow-editor.component';
import { BoxShadowSectionComponent } from './box-shadow-section/box-shadow-section.component';
import { ShadowsComponent } from './shadows.component';
import { BoxShadowLayerComponent } from './box-shadow-editor/box-shadow-layer/box-shadow-layer.component';

@NgModule({
  declarations: [
    ShadowsComponent,
    BoxShadowSectionComponent,
    BoxShadowEditorComponent,
    BoxShadowLayerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DragDropModule,
    ColorPickerModule,
  ],
  exports: [
    ShadowsComponent,
    BoxShadowEditorComponent
  ]
})
export class ShadowsModule {}