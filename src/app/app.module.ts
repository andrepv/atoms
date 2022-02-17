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
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HeaderComponent } from './components/header/header.component';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { EditorComponent } from './components/editor/editor.component';
import { SharedModule } from '@shared/shared.module';
import { ColorsModule } from '@colors/colors.module';
import { SpacingModule } from '@spacing/spacing.module';
import { TypographyModule } from '@typography/typography.module';
import { ShadowsModule } from './modules/shadows/shadows.module';
import { BordersModule } from './modules/borders/borders.module';
import { DurationsModule } from './modules/durations/durations.module';
import { CustomTokensModule } from './modules/custom-tokens/custom-tokens.module';
import { ContentComponent } from './components/content/content.component';
import { ButtonExportComponent } from './components/button-export/button-export.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { ExportEditorBorderRadiusComponent } from './components/export-editor-sections/export-editor-border-radius.component';
import { ExportEditorBordersComponent } from './components/export-editor-sections/export-editor-borders.component';
import { ExportEditorBoxShadowComponent } from './components/export-editor-sections/export-editor-box-shadow.component';
import { ExportEditorColorsComponent } from './components/export-editor-sections/export-editor-colors.component';
import { ExportEditorCustomTokensComponent } from './components/export-editor-sections/export-editor-custom-tokens.component';
import { ExportEditorDurationsComponent } from './components/export-editor-sections/export-editor-durations.component';
import { ExportEditorSectionsComponent } from './components/export-editor-sections/export-editor-sections.component';
import { ExportEditorSpacingComponent } from './components/export-editor-sections/export-editor-spacing.component';
import { ExportEditorTextStylesComponent } from './components/export-editor-sections/export-editor-text-styles.component';
import { ExportEditorTypefaceComponent } from './components/export-editor-sections/export-editor-typeface.component';
import { ExportEditorToolbarComponent } from './components/export-editor-toolbar/export-editor-toolbar.component';
import { ExportEditorSectionsToggleComponent } from './components/export-editor-sections-toggle/export-editor-sections-toggle.component';
import { ExportEditorComponent } from './components/export-editor/export-editor.component';

registerLocaleData(en);

@NgModule({ 
  declarations: [
    AppComponent,
    ToolbarComponent,
    HeaderComponent,
    ExplorerComponent,
    EditorComponent,
    ContentComponent,
    ButtonExportComponent,
    ThemeSwitcherComponent,


    ExportEditorComponent,
    ExportEditorSectionsToggleComponent,
    ExportEditorToolbarComponent,
    ExportEditorColorsComponent,
    ExportEditorSpacingComponent,
    ExportEditorBordersComponent,
    ExportEditorBorderRadiusComponent,
    ExportEditorCustomTokensComponent,
    ExportEditorDurationsComponent,
    ExportEditorBoxShadowComponent,
    ExportEditorTextStylesComponent,
    ExportEditorTypefaceComponent,
    ExportEditorSectionsComponent,
  ],
  imports: [  
    SharedModule,
    ColorsModule,
    SpacingModule,
    TypographyModule,
    ShadowsModule,
    BordersModule,
    DurationsModule,
    CustomTokensModule,
    NzGridModule,
    NzAnchorModule,
    CommonModule,
    BrowserModule,
    InlineSVGModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
