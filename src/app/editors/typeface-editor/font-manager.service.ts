import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomFont, FontCategory, GoogleFont } from '../../sections/typeface/typeface.model';
import { CustomFontsManager } from './custom-fonts/custom-fonts-manager';
import { GoogleFontsManager } from './google-fonts/google-fonts-manager';

export interface Font {
	kind?: string;
	family: string;
	variants: string[];
	subsets: string[];
	version?: string;
	lastModified?: string;
	files?: {[key: string]: string};
	category: FontCategory;
}

@Injectable({
  providedIn: 'root'
})
export class FontManagerService {
	embeddedFonts = new Set<string>();

	googleFonts: GoogleFontsManager;
	customFonts: CustomFontsManager;

  constructor(http: HttpClient) {
		this.googleFonts = new GoogleFontsManager(http, this);
		this.customFonts = new CustomFontsManager(this);
	}

	load(fonts: (GoogleFont | CustomFont)[]) {
    let googleFonts: GoogleFont[] = [];

    for (let font of fonts) {
      if (font.type === "google-fonts") {
        googleFonts.push(font as GoogleFont)
      } else if (font.type === "custom-font") {
				this.customFonts.addCustomFont(font.family, (font as CustomFont).data)
      }
    }

    if (googleFonts.length) {
      this.googleFonts.addStylesheet({fonts: googleFonts, preview: false})
    }
	}
}