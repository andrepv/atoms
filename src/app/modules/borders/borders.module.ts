import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { BordersComponent } from './borders.component';
import { BorderRadiusComponent } from './border-radius/border-radius.component';
import { BordersSectionComponent } from './borders-section/borders-section.component';
import { BordersEditorComponent } from './borders-editor/borders-editor.component';

@NgModule({
  declarations: [
    BordersComponent,
    BorderRadiusComponent,
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