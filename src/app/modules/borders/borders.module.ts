import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { BordersComponent } from './borders.component';
import { BorderRadiusSectionComponent } from './border-radius-section/border-radius-section.component';
import { BordersSectionComponent } from './borders-section/borders-section.component';
import { BordersEditorComponent } from './borders-editor/borders-editor.component';

@NgModule({
  declarations: [
    BordersComponent,
    BorderRadiusSectionComponent,
    BordersSectionComponent,
    BordersEditorComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    BordersComponent,
    BordersEditorComponent
  ]
})
export class BordersModule {}