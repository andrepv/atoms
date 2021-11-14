import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DBGroup, TokensByTheme } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { GoogleFont, TypefaceTokenModel } from '../../typeface/typeface.model';
import { FontManagerService } from '../font-manager.service';

@Component({
  selector: 'app-loaded-fonts',
  templateUrl: './loaded-fonts.component.html',
  styleUrls: ['./loaded-fonts.component.less']
})
export class LoadedFontsComponent implements OnInit {
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
