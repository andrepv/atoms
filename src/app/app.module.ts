import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';

import { InlineSVGModule } from 'ng-inline-svg';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { HeaderComponent } from './layout/header/header.component';
import { ExplorerComponent } from './layout/explorer/explorer.component';
import { EditorComponent } from './layout/editor/editor.component';
import { SharedModule } from '@shared/shared.module';
import { ColorsModule } from '@colors/colors.module';
import { SpacingModule } from '@spacing/spacing.module';
import { TypographyModule } from '@typography/typography.module';

registerLocaleData(en);

@NgModule({ 
  declarations: [
    AppComponent,
    ToolbarComponent,
    HeaderComponent,
    ExplorerComponent,
    EditorComponent,
  ],
  imports: [  
    SharedModule,
    ColorsModule,
    SpacingModule,
    TypographyModule,
    NzGridModule,
    NzAnchorModule,
    CommonModule,
    BrowserModule,
    InlineSVGModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
