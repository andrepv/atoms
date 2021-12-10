import { Component, OnInit } from '@angular/core';
import tinycolor from "tinycolor2";
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { ColorPaletteTokenModel as Token, COLORPALETTE_DB_DATA } from './color-palette.model';
import { StoreToken, StoreGroup, DBGroup as Group } from '@core/core.model';
import { provideSectionDeps } from '@utils/provide-section-deps';

@Component({
  selector: 'app-color-palette-section',
  templateUrl: './color-palette-section.component.html',
  styleUrls: ['./color-palette-section.component.less'],
  providers: [...provideSectionDeps(COLORPALETTE_DB_DATA.tableGroupName)]
})
export class ColorPaletteSectionComponent implements OnInit {
  constructor(private section: SectionContentManagerService<Token, Group>) {}

  ngOnInit() {
    this.section.configure({
      hooks: {
        getDefaultToken: () => ({
          color: 'rgba(255,255,255,1)',
          isPrimary: true,
          tintConfigs: {mixRatio: 80, saturation: 1},
          shadeConfigs: {mixRatio: 80, saturation: 1}
        }),
        onTokenDelete: (deletedToken: any, group) => {
          if (!deletedToken.isPrimary) {
            this.deleteVariant(deletedToken, group);
          }

          if (deletedToken.isPrimary) {
            this.deletePrimaryColor(deletedToken, group)
          }
        },
        onTokenAdd: (token: any) => {
          if (token.isPrimary) {
            token.tint = [];
            token.shade = [];
          } 
        },
        onLoad: () => {
          this.section.getGroupList().map((group: any) => {
            group.tokens.map((token: any) => this.handleTokenLoad(token, group))

            group.tokens = group.tokens.filter((token: any) => token.isPrimary)
          })
        },
        onCreateTokenDuplicate: (token: any) => {
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

  getHex(rgba: string) {
    return tinycolor(rgba).toHexString();
  }

  getHsl(rgba: string) {
    return tinycolor(rgba).toHslString();
  }

  getReadability(color: string) {
    return tinycolor.readability(color, "#fff").toFixed(2);
  }

  isTokenVisible = (token: any) => {
    return token.isPrimary;
  }

  private getToken(group: StoreGroup, tokenId: number) {
    return group.tokens.find(token => token.id === tokenId)
  }

  private deleteVariant(token: any, group: any) {
    const {type, primaryColorId} = token;
    const primaryColor = this.getToken(group, primaryColorId);

    if (primaryColor) {
      primaryColor[type] = primaryColor[type].filter((variant: StoreToken<Token>) => variant.id !== token.id)
    }
  }

  private deletePrimaryColor(token: any, group: any) {
    token.tint.map((token: any) => {
      this.section.deleteToken(token, group)
    })
    token.shade.map((token: any) => {
      this.section.deleteToken(token, group)
    })
  }

  private handleTokenLoad(token: any, group: any) {
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
