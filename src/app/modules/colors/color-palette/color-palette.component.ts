import { Component, OnInit } from '@angular/core';
import tinycolor from "tinycolor2";
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { db } from '@core/indexedDB';
import { ColorPaletteTokenModel as Token } from './color-palette.model';
import { StoreToken, StoreGroup, DBGroup as Group } from '@core/core.model';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.less'],
  providers: [
    {provide: 'tables', useValue: db.colorPalette},
    SectionContentManagerService
  ]
})
export class ColorPaletteComponent implements OnInit {
  constructor(private section: SectionContentManagerService<Token, Group>) {}
  
  ngOnInit() {
    this.section.configure({
      contentManagerConfigs: {
        getDefaultTokenValue: () => ({
          color: 'rgba(255,255,255,1)',
          isPrimary: true,
        }),
        onTokenDelete: (deletedToken, group) => {
          if (!deletedToken.value.isPrimary) {
            this.onVariantColorDelete(deletedToken, group);
          }
        }
      }
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

  isTokenVisible = (token: StoreToken<Token>) => {
    return token.value.isPrimary;
  }

  getTints = (token: StoreToken<Token>, group: StoreGroup<Group, Token>) => {
    if (!token.value.isPrimary || !token.value.tints) return [];
    return this.section.getGroup(group.id).tokens.filter(({id}) => token.value.tints.includes(id)).reverse()
  }

  getShades = (token: StoreToken<Token>, group: StoreGroup<Group, Token>) => {
    if (!token.value.isPrimary || !token.value.shades) return [];
    return this.section.getGroup(group.id).tokens.filter(({id}) => token.value.shades.includes(id))
  }

  private onVariantColorDelete(deletedToken: StoreToken<Token>, group: StoreGroup<Group, Token>) {
    const variant = `${deletedToken.value.type}s`;
    const primaryColor = group.tokens
    .filter(token => token.value.isPrimary)
    .find(token => token.value[variant].includes(deletedToken.id));

    if (primaryColor) {
      primaryColor.value[variant] = primaryColor.value[variant].filter((id: number) => id !== deletedToken.id);
      this.section.setTokenValue(primaryColor.value, primaryColor.id, group.id);
    }
  }
}
