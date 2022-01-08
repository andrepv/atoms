import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DurationsComponent } from './durations.component';
import { DurationsSectionComponent } from './durations-section/durations-section.component';

@NgModule({
  declarations: [
    DurationsComponent,
    DurationsSectionComponent,
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