import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ThemeTokens } from '@shared/components/tokens-section-list/tokens-section-list.component';
import { GoogleFont } from '../../typeface/typeface.model';
import { FontManagerService } from '../font-manager.service';

@Component({
  selector: 'app-loaded-fonts',
  templateUrl: './loaded-fonts.component.html',
  styleUrls: ['./loaded-fonts.component.less']
})
export class LoadedFontsComponent implements OnInit {
  @Output() save: EventEmitter<GoogleFont> = new EventEmitter();

  constructor(private fontsManager: FontManagerService) {}

  ngOnInit() {}

  onThemeFontsLoad(data: ThemeTokens[]) {
    for (let themeTokens of data) {
      const fonts = Object.values(themeTokens.tokens.map(token => token.value));
			this.fontsManager.load(fonts);
		}
  }
}
