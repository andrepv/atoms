import { Component, Input, OnInit } from '@angular/core';
import { TextStylesService } from '../../sections/text-styles/text-styles.service';

type TextPreviewData = {
  styles: Object,
  text: string
}

@Component({
  selector: 'app-text-preview',
  template: `<div [style]="getStyles()"><p>{{ text }}</p></div>`,
  styleUrls: ['./text-preview.component.less']
})
export class TextPreviewComponent implements OnInit {
  @Input() data: TextPreviewData;
  @Input() excludedStyles = [];
  @Input() customStyles = {};

  get text() {
    return this.data.text || this.textStyles.getDefaultText();
  }

  constructor(private textStyles: TextStylesService) {}

  ngOnInit() {}

  getStyles() {
    const styles = {...this.customStyles};
    const styleProps = Object.keys(this.textStyles.DEFAULT_TEXT_STYLE_VALUE.styles);
    const styleTokens = this.data.styles || {};

    for (let styleProp of styleProps) {
      if (!this.excludedStyles.includes(styleProp)) {

        const styleTokenId = styleTokens[styleProp] ?? false;

        styles[styleProp] = !styleTokenId
          ? this.textStyles.getDefaultStyle(styleProp)
          : this.textStyles.getStyle(styleProp, styleTokenId)
      }
    }

    return styles;
  }
}
