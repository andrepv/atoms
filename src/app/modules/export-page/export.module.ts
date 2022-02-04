import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ExportComponent } from './export.component';
import { ExportEditorComponent } from './export-editor/export-editor.component';
import { AppRoutingModule } from '../../app-routing.module';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ExportEditorSectionComponent } from './export-editor-section/export-editor-section.component';
import { ExportCodePreviewComponent } from './export-code-preview/export-code-preview.component';
import { ExportEditorBorderRadiusComponent } from './export-editor/export-editor-border-radius.component';
import { ExportEditorBordersComponent } from './export-editor/export-editor-borders.component';
import { ExportEditorBoxShadowComponent } from './export-editor/export-editor-box-shadow.component';
import { ExportEditorColorsComponent } from './export-editor/export-editor-colors.component';
import { ExportEditorCustomTokensComponent } from './export-editor/export-editor-custom-tokens.component';
import { ExportEditorDurationsComponent } from './export-editor/export-editor-durations.component';
import { ExportEditorSpacingComponent } from './export-editor/export-editor-spacing.component';
import { ExportEditorTextStylesComponent } from './export-editor/export-editor-text-styles.component';
import { ExportEditorTypefaceComponent } from './export-editor/export-editor-typeface.component';
import { InputFileNameComponent } from './input-file-name/input-file-name.component';
import { ExportEditorSharedActionsBarComponent } from './export-editor-shared-actions-bar/export-editor-shared-actions-bar.component';


@NgModule({
  declarations: [
    ExportComponent,
    ExportEditorComponent,
    ExportEditorSectionComponent,
    ExportEditorColorsComponent,
    ExportCodePreviewComponent,
    ExportEditorSpacingComponent,
    InputFileNameComponent,
    ExportEditorBordersComponent,
    ExportEditorBorderRadiusComponent,
    ExportEditorCustomTokensComponent,
    ExportEditorDurationsComponent,
    ExportEditorBoxShadowComponent,
    ExportEditorTextStylesComponent,
    ExportEditorTypefaceComponent,
    ExportEditorSharedActionsBarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    NzCheckboxModule,
  ],
  exports: [ExportEditorComponent],
})
export class ExportPageModule {}