import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DBGroup, TokensByTheme } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { GoogleFont, TypefaceTokenModel } from '../typeface-section/typeface.model';
import { FontManagerService } from '../typeface-editor/font-manager.service';

@Component({
  selector: 'app-typeface-list',
  templateUrl: './typeface-list.component.html',
  styleUrls: ['./typeface-list.component.less']
})
export class TypefaceListComponent implements OnInit {
  @Output() save: EventEmitter<GoogleFont> = new EventEmitter();
  fontsByTheme: TokensByTheme<TypefaceTokenModel>

  constructor(
    private fontsManager: FontManagerService,
    private section: SectionContentManagerService<TypefaceTokenModel, DBGroup>,
  ) {}

  async ngOnInit() {
    this.fontsByTheme = await this.section.getTokensByTheme();
  }

  onThemeFontsLoad(data: TokensByTheme<TypefaceTokenModel>) {
    for (let themeTokens of data) {
      const fonts = Object.values(themeTokens.tokens.map(token => token.value));
			this.fontsManager.load(fonts);
		}
  }
}
