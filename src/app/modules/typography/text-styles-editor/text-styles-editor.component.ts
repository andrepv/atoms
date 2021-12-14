import { Component, Input, OnInit } from '@angular/core';
import { TextPreviewService } from '../text-preview/text-preview.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { DBGroup, EditableContent, SectionTokenValue } from '@core/core.model';
import { TextStylesDBToken } from '@typography/text-styles-section/text-styles.model';
import { TextPreviewStyleProps } from '@typography/text-preview/text-preview.model';

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
    private preview: TextPreviewService,
  ) {}

  text = '';
  color = '';
  backgroundColor = '';

  ngOnInit() {
    this.text = this.token.text;
    this.color = this.token.color;
    this.backgroundColor = this.token.backgroundColor;
  }

  getStyleTokenId(styleProp: string) {
    const styles = this.token.styles;
    return !styles ? null : styles[styleProp];
  }

  async setStyleRef(tokenId: number, styleProp: TextPreviewStyleProps) {
    await this.setTokenValue({
      styles: {
        ...this.token.styles,
        [styleProp]: tokenId
      }
    });

    this.preview.setPreviewStyleRef(
      this.token.id,
      styleProp,
      tokenId
    )
  }

  async setPreviewText() {
    const inputValue = this.text.trim();

    if (inputValue.length && inputValue !== this.token.text) {
      await this.setTokenValue({text: inputValue});
      this.preview.setPreviewText(this.token.id, inputValue)

    } else {
      this.text = this.token.text;
    }
  }

  changeColor(value: string) {
    this.color = value;
    this.preview.setPreviewColor(this.token.id, value);
  }

  saveColor() {
    this.setTokenValue({color: this.color});
  }

  changeBackgroundColor(value: string) {
    this.backgroundColor = value;
    this.preview.setPreviewBackgroundColor(this.token.id, value)
  }

  saveBackgroundColor() {
    this.setTokenValue({backgroundColor: this.backgroundColor});
  }

  private async setTokenValue(obj: Partial<SectionTokenValue<TextStylesDBToken>>) {
    const {group} = this.content;
    const value = {...this.token}
  
    for (let key in obj) {
      value[key] = obj[key];
      await this.section.updateToken(this.token, group, {
        [key]: obj[key]
      });
    }
  }
}
