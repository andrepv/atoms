import { Component, Input, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { DBGroup, EditableContent, SectionTokenValue } from '@core/core.model';
import { TextStylesDBToken } from '@typography/text-styles-section/text-styles.model';
import { StoreService } from '@core/services/store.service';

@Component({
  selector: 'app-text-styles-editor',
  templateUrl: './text-styles-editor.component.html',
  styleUrls: ['./text-styles-editor.component.less'],
})
export class TextStylesEditorComponent implements OnInit {
  @Input() content: EditableContent<TextStylesDBToken, DBGroup>;

  get token() {
    return this.content.token;
  }

  constructor(
    private section: SectionContentManagerService<TextStylesDBToken, DBGroup>,
    private store: StoreService,
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
      this.updateTextStyles({text: inputValue});
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
    styles: Partial<SectionTokenValue<TextStylesDBToken>>,
    updateStore = false
  ) {
    return this.section.updateToken(this.token, this.content.group, styles, updateStore);
  }

  private async getVariants() {
    const typeface = this.store.getSectionToken('Type Face', this.token.typefaceId);

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
