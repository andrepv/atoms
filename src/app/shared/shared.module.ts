import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { GroupListHeaderComponent } from './components/group-list-header/group-list-header.component';
import { GroupHeaderComponent } from './components/group-header/group-header.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { TextEditableComponent } from './components/text-editable/text-editable.component';
import { TokenComponent } from './components/token/token.component';
import { ModularScaleEditorComponent } from './components/modular-scale-editor/modular-scale-editor.component';
import { TokensSectionSelectComponent } from './components/tokens-section-select/tokens-section-select.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ColorPickerPresetPresetComponent } from './components/color-picker-preset/color-picker-preset.component';
import { SliderComponent } from './components/slider/slider.component';
import { PageComponent } from './components/page/page.component';
import { SectionTreeComponent } from './components/section-tree/section-tree.component';
import { AppRoutingModule } from '../app-routing.module';
import { TokenActionsComponent } from './components/token-actions/token-actions.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { ModularScaleEditorTokenComponent } from './components/modular-scale-editor-token/modular-scale-editor-token.component';
import { ColorContrastCheckerComponent } from './components/color-contrast-checker/color-contrast-checker.component';
import { SelectSplitItemComponent } from './components/select-split-item/select-split-item.component';
import { EditorCardComponent } from './components/editor-card/editor-card.component';
import { EditorBlockComponent } from './components/editor-block/editor-block.component';
import { GroupViewListComponent } from './components/group-view-list/group-view-list.component';
import { TokenNameComponent } from './components/token-name/token-name.component';


import { ExportListComponent } from './components/export-list/export-list.component';
import { SectionCodePreviewComponent } from './components/section-code-preview/section-code-preview.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { SectionCodeExportComponent } from './components/section-code-export/section-code-export.component';
import { ExportCodePreviewComponent } from './components/export-code-preview/export-code-preview.component';
import { ExportEditorFormatsComponent } from './components/export-editor-formats/export-editor-formats.component';
import { ExportEditorSectionComponent } from './components/export-editor-section/export-editor-section.component';
import { InputFileNameComponent } from './components/input-file-name/input-file-name.component';


@NgModule({
  declarations: [
    GroupHeaderComponent,
    GroupListComponent,
    GroupListHeaderComponent,
    TokenComponent,
    TokensSectionSelectComponent,
    TextEditableComponent,
    ModularScaleEditorComponent,
    AutofocusDirective,
    ColorPickerComponent,
    ColorPickerPresetPresetComponent,
    SliderComponent,
    PageComponent,
    SectionTreeComponent,
    TokenActionsComponent,
    StartPageComponent,
    ModularScaleEditorTokenComponent,
    ColorContrastCheckerComponent,
    SelectSplitItemComponent,
    EditorCardComponent,
    EditorBlockComponent,
    GroupViewListComponent,
    TokenNameComponent,
    ExportEditorSectionComponent,
    ExportCodePreviewComponent,
    InputFileNameComponent,
    ExportEditorFormatsComponent,
    ExportListComponent,
    SectionCodePreviewComponent,
    SectionCodeExportComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    NzToolTipModule,
    NzDropDownModule,
    NzIconModule,
    NzSelectModule,
    NzButtonModule,
    NzInputModule,
    NzModalModule,
    NzTypographyModule,
    NzMessageModule,
    NzListModule,
    NzSwitchModule,
    NzRadioModule,
    NzSliderModule,
    NzInputNumberModule,
    NzPopoverModule,
    NzTabsModule,
    NzGridModule,
    NzCheckboxModule,
    ColorPickerModule,
  ],
  exports: [
    FormsModule,

    GroupHeaderComponent,
    GroupListComponent,
    TokenComponent,
    TokensSectionSelectComponent,
    TextEditableComponent,
    ModularScaleEditorComponent,
    ModularScaleEditorTokenComponent,
    ColorPickerComponent,
    SliderComponent,
    PageComponent,
    SectionTreeComponent,
    TokenActionsComponent,
    StartPageComponent,
    ColorContrastCheckerComponent,
    SelectSplitItemComponent,
    EditorCardComponent,
    EditorBlockComponent,
    TokenNameComponent,
    GroupViewListComponent,

    NzToolTipModule,
    NzDropDownModule,
    NzIconModule,
    NzSelectModule,
    NzButtonModule,
    NzInputModule,
    NzModalModule,
    NzTypographyModule,
    NzMessageModule,
    NzListModule,
    NzSwitchModule,
    NzRadioModule,
    NzSliderModule,
    NzInputNumberModule,
    NzPopoverModule,
    NzGridModule,
    NzCheckboxModule,

    ColorPickerModule,

    ExportEditorSectionComponent,
    ExportCodePreviewComponent,
    InputFileNameComponent,
    ExportEditorFormatsComponent,
    ExportListComponent,
    SectionCodePreviewComponent,
    SectionCodeExportComponent,
  ]
})
export class SharedModule {}
