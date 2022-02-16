import { Component, Input, OnInit } from '@angular/core';
import { EditableSectionContent, StorageTokenValue } from '@core/core-types';
import { TextStylesDBGroup, TextStylesDBToken } from '@typography/text-styles-section/text-styles.model';
import { SectionManagerCachedContentService  } from '@core/services/section-manager-cached-content.service';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';

@Component({
  selector: 'app-text-styles-editor',
  templateUrl: './text-styles-editor.component.html',
  styleUrls: ['./text-styles-editor.component.less'],
})
export class TextStylesEditorComponent implements OnInit {
  @Input() content: EditableSectionContent<TextStylesDBToken, TextStylesDBGroup>;

  get token() {
    return this.content.token;
  }

  get group() {
    return this.content.group;
  }

  constructor(
    private cache: SectionManagerCachedContentService,
    private tokensManager: SectionManagerTokensService,
  ) {}

  text = '';
  color = '';
  backgroundColor = '';
  variants = [];

  async ngOnInit() {
    this.text = this.token.text;
    this.color = this.token.color;
    this.backgroundColor = this.token.backgroundColor;
    this.variants = await this.getVariants();
  }

  setPreviewText() {
    const inputValue = this.text.trim();

    if (inputValue.length && inputValue !== this.token.text) {
      this.updateTextStyles({text: inputValue}, true);
    } else {
      this.text = this.token.text;
    }
  }

  async setFontFamily(typefaceId: number) {
    await this.updateTextStyles({typefaceId}, true);
    this.variants = await this.getVariants();    
  }

  changeTextColor(value: string) {
    this.color = value;
  }

  changeBackgroundColor(value: string) {
    this.backgroundColor = value;
  }

  setTextDecoration(value: TextStylesDBToken['textDecoration']) {
    if (this.token.textDecoration === value) {
      this.updateTextStyles({textDecoration: 'none'}, true);
      return;
    }

    this.updateTextStyles({textDecoration: value}, true);
  }

  updateTextStyles(
    styles: Partial<StorageTokenValue<TextStylesDBToken>>,
    updateCache = false
  ) {
    return this.tokensManager.update(this.token, styles, updateCache)
  }

  private async getVariants() {
    const typeface = this.cache.getSectionToken('Type Face', this.token.typefaceId);

    if (typeface) {

      if (
        typeface.type !== "google-fonts" && 
        this.token.fontWeight !== '400'
      ) {
        await this.updateTextStyles({fontWeight: '400'}, true)
      }

      if (typeface.type === "google-fonts") {

        if (!typeface.variants.includes(this.token.fontWeight)) {
          await this.updateTextStyles({fontWeight: '400'}, true);
        }

        return (typeface as any).variants
        .map((variant: string) => variant === "regular" ? '400' : variant)
        .filter((variant: string) => !!Number(variant));
      }
      return [];
    }
    return [];
  }
}
