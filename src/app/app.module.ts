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
import { ToolbarComponent } from './components/toolbar/toolbar.component';


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

import { DBService } from './services/db.service';
import { ThemeManagerService } from './services/theme-manager.service';
import { HeaderComponent } from './components/header/header.component';
import { TypographyComponent } from './pages/typography.component';
import { SpacingComponent } from './pages/spacing.component';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { TypefaceComponent } from './components/typeface/typeface.component';
import { TypescaleComponent } from './components/typescale/typescale.component';
import { GroupHeaderComponent } from './components/group-header/group-header.component';
import { EditableTextComponent } from './components/editable-text/editable-text.component';
import { TokenDropdownMenuComponent } from './components/token-dropdown-menu/token-dropdown-menu.component';
import { TypefaceEditorComponent } from './components/typeface-editor/typeface-editor.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { GoogleFontsComponent } from './components/typeface-editor/google-fonts/google-fonts.component';
import { CustomFontComponent } from './components/typeface-editor/custom-fonts/custom-font.component';

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
    GroupHeaderComponent,
    EditableTextComponent,
    TokenDropdownMenuComponent,
    TypefaceEditorComponent,
    GoogleFontsComponent,
    CustomFontComponent,
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
    NzRadioModule
  ],
  providers: [
    DBService,
    ThemeManagerService,
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
