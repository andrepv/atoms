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

import { GroupListHeaderComponent } from './components/group-list-header/group-list-header.component';
import { GroupHeaderComponent } from './components/group-header/group-header.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { TextEditableComponent } from './components/text-editable/text-editable.component';
import { TokenComponent } from './components/token/token.component';
import { GroupComponent } from './components/group/group.component';
import { ModularScaleEditorComponent } from './components/modular-scale-editor/modular-scale-editor.component';
import { TokensSectionSelectComponent } from './components/tokens-section-select/tokens-section-select.component';
import { TokenEditableComponent } from './components/token-editable/token-editable.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ColorPickerPresetPresetComponent } from './components/color-picker-preset/color-picker-preset.component';
import { SliderComponent } from './components/slider/slider.component';
import { PageComponent } from './components/page/page.component';
import { SectionTreeComponent } from './components/section-tree/section-tree.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    GroupComponent,
    GroupHeaderComponent,
    GroupListComponent,
    GroupListHeaderComponent,
    TokenComponent,
    TokenEditableComponent,
    TokensSectionSelectComponent,
    TextEditableComponent,
    ModularScaleEditorComponent,
    AutofocusDirective,
    ColorPickerComponent,
    ColorPickerPresetPresetComponent,
    SliderComponent,
    PageComponent,
    SectionTreeComponent,
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

    ColorPickerModule
  ],
  exports: [
    FormsModule,

    GroupComponent,
    GroupListComponent,
    TokenComponent,
    TokenEditableComponent,
    TokensSectionSelectComponent,
    TextEditableComponent,
    ModularScaleEditorComponent,
    ColorPickerComponent,
    SliderComponent,
    PageComponent,
    SectionTreeComponent,

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

    ColorPickerModule
  ]
})
export class SharedModule {}
