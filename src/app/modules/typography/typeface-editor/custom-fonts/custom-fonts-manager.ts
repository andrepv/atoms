import { FontManagerService } from "../font-manager.service";

export class CustomFontsManager {
	private customFontPreviewNode: HTMLStyleElement | null = null;

	constructor(private fontManager: FontManagerService) {}

	addCustomFontPreview(
		data: string | ArrayBuffer,
		fontFamily = "CustomFontPreview"
	) {
		if (!this.customFontPreviewNode) {
			this.customFontPreviewNode = document.createElement("style");
			document.head.appendChild(this.customFontPreviewNode);
		}

    const fontFace = `@font-face {
      font-family : ${fontFamily};
      src : url(${data});
    }`;

		this.customFontPreviewNode.innerHTML = fontFace;
	}

	addCustomFont(fontFamily: string, data: string | ArrayBuffer) {
		if (this.fontManager.embeddedFonts.has(fontFamily) || !data) {
			return;
		}

		const stylesheetNode = document.createElement("style");

		stylesheetNode.append(`@font-face {
      font-family : ${fontFamily};
      src : url(${data});
    }`)
	
		document.head.appendChild(stylesheetNode);
		this.fontManager.embeddedFonts.add(fontFamily);
	}
}