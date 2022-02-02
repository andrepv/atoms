import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DurationsComponent } from './durations.component';
import { DurationsSectionComponent } from './durations-section/durations-section.component';
import { MotionGroupComponent } from './motion-group/motion-group.component';
import { ButtonPlayComponent } from './button-play/button-play.component';
import { MotionTokenComponent } from './motion-token/motion-token.component';

@NgModule({
  declarations: [
    DurationsComponent,
    DurationsSectionComponent,
    MotionGroupComponent,
    ButtonPlayComponent,
    MotionTokenComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    DurationsComponent,
  ]
})
export class DurationsModule {}