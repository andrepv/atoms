import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SpacingComponent } from './spacing.component';
import { SpacingSectionComponent } from './spacing-section/spacing-section.component';

@NgModule({
  declarations: [
    SpacingComponent,
    SpacingSectionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SpacingComponent,
  ]
})
export class SpacingModule {}