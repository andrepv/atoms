import { Component, OnInit } from '@angular/core';
import { db } from '../../services/db.service';
import { ContentManagerService } from '../../services/content-manager.service';

import tinycolor from "tinycolor2";
import { StoreService, Token, TokenGroup } from '../../services/store.service';

@Component({
  selector: 'app-color-palette',
  template: `
    <app-groups
      [tokenTemplate]="tokenTemplateRef"
      layout="list"
      [isTokenVisible]="isTokenVisible"
      [getPreviousTokens]="getTints"
      [getNextTokens]="getShades"
    >
      <ng-template #tokenTemplateRef let-token>
        <div class="token" [style.background]="token.value.color">
          <p style.color="#fff">{{ getReadability(token.value.color) }}</p>
        </div>
        <p>HEX: {{ getHex(token.value.color) }}</p>
        <p>RGBA: {{ token.value.color }}</p>
        <p>HSLA: {{ getHsl(token.value.color) }}</p>
      </ng-template>
    </app-groups>
  `,
  styleUrls: ['./color-palette.component.less'],
  providers: [
    {provide: 'tables', useValue: db.colorPalette},
    ContentManagerService
  ]
})
export class ColorPaletteComponent implements OnInit {

  constructor(
    public cm: ContentManagerService,
    private store: StoreService
  ) {}
  
  ngOnInit() {
    this.cm.configure({
      getDefaultTokenValue: () => ({
        color: 'rgba(255,255,255,1)',
        isPrimary: true
      }),
      onTokenDelete: (deletedToken, group) => {
        if (!deletedToken.value.isPrimary) {
          this.onVariantColorDelete(deletedToken, group);
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

  isTokenVisible(token: Token) {
    return token.value.isPrimary;
  }

  getTints = (token: Token, group: TokenGroup) => {
    if (!token.value.isPrimary || !token.value.tints) return [];
    return this.store.getGroup(this.cm.sectionName, group.id).tokens.filter(({id}) => token.value.tints.includes(id)).reverse()
  }

  getShades = (token: Token, group: TokenGroup) => {
    if (!token.value.isPrimary || !token.value.shades) return [];
    return this.store.getGroup(this.cm.sectionName, group.id).tokens.filter(({id}) => token.value.shades.includes(id))
  }

  private onVariantColorDelete(deletedToken: Token, group: TokenGroup) {
    const variant = `${deletedToken.value.type}s`;
    const primaryColor = group.tokens
    .filter(token => token.value.isPrimary)
    .find(token => token.value[variant].includes(deletedToken.id));

    if (primaryColor) {
      primaryColor.value[variant] = primaryColor.value[variant].filter((id: number) => id !== deletedToken.id);
      this.cm.setTokenValue(primaryColor.value, primaryColor.id, group.id);
    }
  }
}
