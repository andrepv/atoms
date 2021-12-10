import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditorService } from '@core/services/editor.service';
import { TextPreviewService } from '../text-preview/text-preview.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { DBGroup, EditableContent } from '@core/core.model';
import { TextStylesTokenModel, TextStylesTokenValue, TEXTSTYLES_DB_DATA } from '@typography/text-styles-section/text-styles.model';
import { TextPreviewStyleProps } from '@typography/text-preview/text-preview.model';

@Component({
  selector: 'app-text-styles-editor',
  templateUrl: './text-styles-editor.component.html',
  styleUrls: ['./text-styles-editor.component.less'],
})
export class TextStylesEditorComponent implements OnInit {
  @Input() content: any;

  constructor(
    private section: SectionContentManagerService,
    private preview: TextPreviewService,
  ) {}

  text = '';

  ngOnInit() {
    this.text = this.content.token.text;
  }

  getStyleTokenId(styleProp: string) {
    const styles = this.content.token.styles;
    return !styles ? null : styles[styleProp];
  }

  async setStyleRef(tokenId: number, styleProp: TextPreviewStyleProps) {
    await this.setTokenValue({
      styles: {
        ...this.content.token.styles,
        [styleProp]: tokenId
      }
    });

    this.preview.setPreviewStyleRef(
      this.content.token.id,
      styleProp,
      tokenId
    )
  }

  async setPreviewText() {
    const inputValue = this.text.trim();

    if (inputValue.length && inputValue !== this.content.token.text) {
      await this.setTokenValue({text: inputValue});
      this.preview.setPreviewText(this.content.token.id, inputValue)

    } else {
      this.text = this.content.token.text;
    }
  }

  private async setTokenValue(obj: TextStylesTokenValue) {
    const {group} = this.content;
    const value = {...this.content.token}
  
    for (let key in obj) {
      value[key] = obj[key];
      await this.section.updateToken(this.content.token, group, {
        [key]: obj[key]
      });
    }
  }
}
