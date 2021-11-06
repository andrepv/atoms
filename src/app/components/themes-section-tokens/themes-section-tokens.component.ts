import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ContentManagerService } from '../../services/content-manager.service';
import { TokenModel } from '../../services/db.service';
import { ThemeManagerService } from '../../services/theme-manager.service';

export type ThemeTokens = {themeName: string, tokens: TokenModel[]};

@Component({
  selector: 'app-themes-section-tokens',
  template: `
    <div *ngFor="let themeTokens of themesTokens">
      <ng-container *ngIf="themesTokens.length">
        <ng-container *ngTemplateOutlet="themeTokensTemplate; context: {$implicit: themeTokens.tokens, themeName: themeTokens.themeName}"></ng-container>
      </ng-container>
    </div>
  `,
  styleUrls: ['./themes-section-tokens.component.less']
})
export class ThemesSectionTokensComponent implements OnInit {
  @Input() themeTokensTemplate: TemplateRef<any>;
  @Output() onLoad: EventEmitter<ThemeTokens[]> = new EventEmitter();

  themesTokens: ThemeTokens[] = [];

  constructor(
    private themeManager: ThemeManagerService,
    private cm: ContentManagerService,
  ) {}
 
  async ngOnInit() {
    this.themesTokens = await this.getTokens();
    this.onLoad.emit(this.themesTokens);
  }

  async getTokens() {
    const tokens: TokenModel[] = await this.cm.tokenTable.toArray();
    const themes = this.themeManager.list;
    const data: ThemeTokens[] = [];

    for (let theme of themes) {
      if (theme.id !== this.themeManager.selected.id) {
        const themeTokens = tokens.filter(token => token.themeId === theme.id);
        if (themeTokens.length) {
          data.push({themeName: theme.name, tokens: themeTokens})
        }
      }
    }

    return data;
  }

}
