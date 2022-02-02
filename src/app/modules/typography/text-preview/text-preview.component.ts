import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from '@core/services/store.service';
import { TextStylesDBGroup, TextStylesDBToken } from '@typography/text-styles-section/text-styles.model';
import TextStyles from './text-styles';

@Component({
  selector: 'app-text-preview',
  templateUrl: 'text-preview.component.html',
  styleUrls: ['./text-preview.component.less']
})
export class TextPreviewComponent implements OnInit {
  @Input() token: TextStylesDBToken;
  @Input() group: TextStylesDBGroup;

  styles: TextStyles;

  constructor(private store: StoreService) {}

  ngOnInit() {
    this.styles = new TextStyles(this.token, this.store);
  }
}
