import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';


import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';


import { DBService } from './services/db.service';
import { ThemeManagerService } from './services/theme-manager.service';
import { HeaderComponent } from './layout/header/header.component';
import { TypographyComponent } from './pages/typography.component';
import { SpacingComponent } from './pages/spacing.component';
import { ExplorerComponent } from './layout/explorer/explorer.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { TypefaceComponent } from './sections/typeface/typeface.component';
import { TypescaleComponent } from './sections/typescale/typescale.component';
import { EditableTextComponent } from './components/editable-text/editable-text.component';
import { TypefaceEditorComponent } from './editors/typeface-editor/typeface-editor.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { GoogleFontsComponent } from './editors/typeface-editor/google-fonts/google-fonts.component';
import { CustomFontComponent } from './editors/typeface-editor/custom-fonts/custom-font.component';
import { LoadedFontsComponent } from './editors/typeface-editor/loaded-fonts/loaded-fonts.component';
import { GroupComponent } from './components/groups/groups.component';
import { TypescaleEditorComponent } from './editors/typescale-editor/typescale-editor.component';
import { EditorComponent } from './layout/editor/editor.component';
import { EditableTokenComponent } from './components/editable-token/editable-token.component';

registerLocaleData(en);

@NgModule({ 
  declarations: [
    AppComponent,
    ToolbarComponent,
    HeaderComponent,
    TypographyComponent,
    SpacingComponent,
    ExplorerComponent,
    AutofocusDirective,
    TypefaceComponent,
    TypescaleComponent,
    EditableTextComponent,
    TypefaceEditorComponent,
    GoogleFontsComponent,
    CustomFontComponent,
    LoadedFontsComponent,
    GroupComponent,
    TypescaleEditorComponent,
    EditorComponent,
    EditableTokenComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    NzGridModule,
    NzToolTipModule,
    NzDropDownModule,
    NzIconModule,
    NzSelectModule,
    NzButtonModule,
    NzInputModule,
    NzModalModule,
    NzTypographyModule,
    NzAnchorModule,
    NzMessageModule,
    ScrollingModule,
    NzListModule,
    NzSwitchModule,
    NzRadioModule,
    NzSliderModule,
    NzInputNumberModule
  ],
  providers: [
    DBService,
    ThemeManagerService,
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
