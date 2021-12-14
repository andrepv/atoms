import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CustomTokensComponent } from './custom-tokens.component';
import { CustomTokensSectionComponent } from './custom-tokens-section/custom-tokens-section.component';
import { CustomTokensEditorComponent } from './custom-tokens-editor/custom-tokens-editor.component';

@NgModule({
  declarations: [
    CustomTokensComponent,
    CustomTokensSectionComponent,
    CustomTokensEditorComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CustomTokensComponent,
  ]
})
export class CustomTokensModule {}