import { PromiseExtended } from "dexie";
import { CustomFont, GoogleFont, TypefaceTokenValue } from "../../../sections/typeface/typeface.model";
import { TokenModel } from "../../../services/db.service";
import { ThemeManagerService } from "../../../services/theme-manager.service";
import { FontManagerService } from "../font-manager.service";

export class LoadedFontsManager {
  constructor(
    private fontManager: FontManagerService,
    private themeManager: ThemeManagerService
  ) {}

  private themeId = 0;

  fonts: {
    [themeName: string]: {
      [fontFamily: string]: TypefaceTokenValue
    }
  } = {};

  async loadFonts(loadTokens: () => PromiseExtended<TokenModel<GoogleFont | CustomFont>[]>) {
    if (this.themeId === this.themeManager.selected.id) return;

    const tokens = await loadTokens();
    this.fonts = {};

		const themes: Map<number, string> = new Map();

		for (let token of tokens) {

			if (token.themeId !== this.themeManager.selected.id) {
				let themeName = themes.get(token.themeId);

				if (!themeName) {
					const theme = await this.themeManager.table.get({id: token.themeId});
					themes.set(token.themeId, theme.name);
					themeName = theme.name;
				}

				this.addFont(themeName, token.value)
			}
		}
    
		for (let themeName in this.fonts) {
      const fonts = Object.values(this.fonts[themeName]);
			this.fontManager.load(fonts);
		}

    this.themeId = this.themeManager.selected.id;
	}

  private addFont(themeName: string, font: TypefaceTokenValue) {
    if (!this.fonts[themeName]) {
      this.fonts[themeName] = {};
    }
  
    this.fonts[themeName][font.family] = font;
  }
}