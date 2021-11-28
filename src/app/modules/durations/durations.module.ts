import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DurationsComponent } from './durations.component';
import { DurationsSectionComponent } from './durations-section/durations-section.component';
import { DurationsEditorComponent } from './durations-editor/durations-editor.component';

@NgModule({
  declarations: [
    DurationsComponent,
    DurationsSectionComponent,
    DurationsEditorComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    DurationsComponent,
    DurationsEditorComponent
  ]
})
export class DurationsModule {}