import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { BordersComponent } from './borders.component';
import { BorderRadiusComponent } from './border-radius/border-radius.component';

@NgModule({
  declarations: [
    BordersComponent,
    BorderRadiusComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    BordersComponent
  ]
})
export class BordersModule {}