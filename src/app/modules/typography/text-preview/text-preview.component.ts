import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from '@core/services/store.service';
import { TextStylesDBToken } from '@typography/text-styles-section/text-styles.model';

const defaultFontFamily = 'Arial';

@Component({
  selector: 'app-text-preview',
  templateUrl: 'text-preview.component.html',
  styleUrls: ['./text-preview.component.less']
})
export class TextPreviewComponent implements OnInit {
  @Input() token: TextStylesDBToken;

  get blockStyles() {
    return {
      color: this.token.color,
      backgroundColor: this.token.backgroundColor
    }
  }

  get textStyles() {
    return {
      fontFamily: this.getFontFamily(),
      letterSpacing: `${this.token.letterSpacing}em`,
      lineHeight: this.token.lineHeight,
      fontSize: `${this.token.modularScaleTokenValue}px`,
      fontWeight: this.token.fontWeight,
      wordSpacing: `${this.token.wordSpacing}em`,
      textDecoration: this.token.textDecoration,
      fontStyle: this.token.fontStyle,
    }
  }

  constructor(private store: StoreService) {}

  getFontFamily() {
    if (!this.token.typefaceId) {
      return defaultFontFamily;
    }

    const typeface = this.store.getSectionToken('Type Face', this.token.typefaceId);

    if (typeface) {
      return typeface.family
    }

    return defaultFontFamily;
  }

  ngOnInit() {}
}
