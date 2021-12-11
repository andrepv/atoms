import { Component, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { ColorPaletteDBToken, ColorPaletteStoreToken, COLORPALETTE_DB_DATA } from './color-palette.model';
import { StoreToken, StoreGroup, DBGroup } from '@core/core.model';
import { provideSectionDeps } from '@utils/provide-section-deps';
import chroma from 'chroma-js';

@Component({
  selector: 'app-color-palette-section',
  templateUrl: './color-palette-section.component.html',
  styleUrls: ['./color-palette-section.component.less'],
  providers: [...provideSectionDeps(COLORPALETTE_DB_DATA.tableGroupName)]
})
export class ColorPaletteSectionComponent implements OnInit {
  constructor(private section: SectionContentManagerService<ColorPaletteDBToken, DBGroup>) {}

  ngOnInit() {
    this.section.configure({
      hooks: {
        getDefaultToken: () => ({
          color: '#ffffff',
          isPrimary: true,
          tintConfigs: {mixRatio: 80, saturation: 1},
          shadeConfigs: {mixRatio: 80, saturation: 1}
        }),
        onTokenDelete: (deletedToken: ColorPaletteStoreToken, group) => {
          if (!deletedToken.isPrimary) {
            this.deleteVariant(deletedToken, group);
          }

          if (deletedToken.isPrimary) {
            this.deletePrimaryColor(deletedToken, group)
          }
        },
        onTokenAdd: (token: ColorPaletteStoreToken) => {
          if (token.isPrimary) {
            token.tint = [];
            token.shade = [];
          } 
        },
        onLoad: () => {
          this.section.getGroupList().map(group => {
            group.tokens.map(token => this.handleTokenLoad(token, group))
            group.tokens = group.tokens.filter(token => token.isPrimary)
          })
        },
        onCreateTokenDuplicate: (token: ColorPaletteStoreToken) => {
          if (!token.isPrimary) {
            token.isPrimary = true;
            token.tintConfigs = {mixRatio: 80, saturation: 1},
            token.shadeConfigs = {mixRatio: 80, saturation: 1}
            delete token.primaryColorId;
            delete token.type;
          }
        },
      },
    })
  }

  getRgb(rgba: string) {
    return chroma(rgba).css();
  }

  getHsl(rgba: string) {
    return chroma(rgba).css('hsl');
  }

  getReadability(color: string) {
    return chroma.contrast(color, "#fff").toFixed(2);
  }

  private getToken(group: StoreGroup, tokenId: number) {
    return group.tokens.find(token => token.id === tokenId)
  }

  private deleteVariant(token: ColorPaletteStoreToken, group: StoreGroup) {
    const {type, primaryColorId} = token;
    const primaryColor = this.getToken(group, primaryColorId);

    if (primaryColor) {
      primaryColor[type] = primaryColor[type].filter((variant: StoreToken) => variant.id !== token.id)
    }
  }

  private deletePrimaryColor(token: ColorPaletteStoreToken, group: StoreGroup<DBGroup, ColorPaletteDBToken>) {
    token.tint.map(token => {
      this.section.deleteToken(token, group)
    })
    token.shade.map(token => {
      this.section.deleteToken(token, group)
    })
  }

  private handleTokenLoad(token: ColorPaletteStoreToken, group: StoreGroup) {
    if (!token.isPrimary) {
      const {primaryColorId = 0, type = 'tint'} = token;
      const primaryColor = this.getToken(group, primaryColorId);

      if (primaryColor) {
        if (!primaryColor[type]) {
          primaryColor[type] = [];
        }

        primaryColor[type].push(token)
      }
    }

    if (token.isPrimary) {
      if (!token.tint) token.tint = [];
      if (!token.shade) token.shade = [];
    }
  
    return token;
  }
}
