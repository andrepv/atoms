import { Component, Input, OnInit } from '@angular/core';
import chroma from 'chroma-js';

@Component({
  selector: 'app-color-contrast-checker',
  templateUrl: './color-contrast-checker.component.html',
  styleUrls: ['./color-contrast-checker.component.less']
})
export class ColorContrastCheckerComponent implements OnInit {
  _backgroundColor = '#fff';
  _textColor = '#fff';

  @Input() set backgroundColor(value: string) {
    if (value) {
      this._backgroundColor = value;
      this.setColorContrast();
    }
  };

  @Input() set textColor(value: string) {
    if (value) {
      this._textColor = value;
      this.setColorContrast();
    }
  };


  colorContrast = 0;
  colorContrastStatus: 'very poor' | 'poor' | 'good' | 'very good';

  constructor() { }

  ngOnInit() {
    this.setColorContrast();
  }

  private setColorContrast() {
    this.colorContrast = Number(chroma.contrast(this._textColor, this._backgroundColor).toFixed(2));

    this.colorContrastStatus = this.colorContrast < 3 ? 'very poor' :
      this.colorContrast < 4.5 ? 'poor' :
      this.colorContrast < 7.1 ? 'good' : 'very good'
  }

}
