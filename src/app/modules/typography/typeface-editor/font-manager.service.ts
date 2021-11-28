import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomFont, FontCategory, GoogleFont } from '../typeface-section/typeface.model';
import { TypefaceDropzoneManager } from '../typeface-dropzone/typeface-dropzone-manager';
import { TypefaceListGoogleManager } from '../typeface-list-google/typeface-list-google-manager';

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

@Injectable()
export class FontManagerService {
	embeddedFonts = new Set<string>();

	googleFonts: TypefaceListGoogleManager;
	customFonts: TypefaceDropzoneManager;

  constructor(http: HttpClient) {
		this.googleFonts = new TypefaceListGoogleManager(http, this);
		this.customFonts = new TypefaceDropzoneManager(this);
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