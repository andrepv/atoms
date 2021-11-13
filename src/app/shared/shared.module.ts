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

import { TokensSectionListComponent } from './components/tokens-section-list/tokens-section-list.component';
import { GroupListHeaderComponent } from './components/group-list-header/group-list-header.component';
import { GroupHeaderComponent } from './components/group-header/group-header.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { TextEditableComponent } from './components/text-editable/text-editable.component';
import { TokenComponent } from './components/token/token.component';
import { GroupComponent } from './components/group/group.component';
import { ModularScaleEditorComponent } from './components/modular-scale-editor/modular-scale-editor.component';
import { TextPreviewComponent } from './components/text-preview/text-preview.component';
import { TokensSectionSelectComponent } from './components/tokens-section-select/tokens-section-select.component';
import { TokenEditableComponent } from './components/token-editable/token-editable.component';
import { AutofocusDirective } from './directives/autofocus.directive';

@NgModule({
  declarations: [
    GroupComponent,
    GroupHeaderComponent,
    GroupListComponent,
    GroupListHeaderComponent,
    TokenComponent,
    TokenEditableComponent,
    TokensSectionListComponent,
    TokensSectionSelectComponent,
    TextEditableComponent,
    TextPreviewComponent,
    ModularScaleEditorComponent,
    AutofocusDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,

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
  ],
  exports: [
    FormsModule,

    GroupComponent,
    GroupListComponent,
    TokenComponent,
    TokenEditableComponent,
    TokensSectionListComponent,
    TokensSectionSelectComponent,
    TextEditableComponent,
    TextPreviewComponent,
    ModularScaleEditorComponent,

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
  ]
})
export class SharedModule {}