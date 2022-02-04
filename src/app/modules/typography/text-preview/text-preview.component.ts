import { Component, Input, OnInit } from '@angular/core';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { TextStylesDBGroup, TextStylesDBToken } from '@typography/text-styles-section/text-styles.model';
import TextStyles from '../text-styles-managers/text-styles';

@Component({
  selector: 'app-text-preview',
  templateUrl: 'text-preview.component.html',
  styleUrls: ['./text-preview.component.less']
})
export class TextPreviewComponent implements OnInit {
  @Input() token: TextStylesDBToken;
  @Input() group: TextStylesDBGroup;

  styles: TextStyles;

  constructor(public tokens: SectionManagerTokensService) {}

  ngOnInit() {
    this.styles = this.tokens.getStyleValue(this.token);
  }
}
