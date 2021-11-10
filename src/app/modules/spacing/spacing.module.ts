import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SpacingEditorComponent } from './spacing-editor/spacing-editor.component';
import { SpacingComponent } from './spacing.component';
import { SpacingGroupListComponent } from './spacing-group-list/spacing-group-list.component';

@NgModule({
  declarations: [
    SpacingComponent,
    SpacingGroupListComponent,
    SpacingEditorComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SpacingComponent,
    SpacingEditorComponent
  ]
})
export class SpacingModule {}