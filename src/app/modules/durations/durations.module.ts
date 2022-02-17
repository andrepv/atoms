import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DurationsComponent } from '@durations/durations.component';
import { DurationsSectionComponent } from '@durations/durations-section/durations-section.component';
import { MotionGroupComponent } from '@durations/motion-group/motion-group.component';
import { ButtonPlayComponent } from '@durations/button-play/button-play.component';
import { MotionTokenComponent } from '@durations/motion-token/motion-token.component';

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