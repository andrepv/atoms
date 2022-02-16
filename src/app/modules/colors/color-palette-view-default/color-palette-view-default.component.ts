import { Component, Input, OnInit } from '@angular/core';
import { CacheGroup, CacheToken } from '@core/core-types';
import chroma from 'chroma-js';

@Component({
  selector: 'app-color-palette-view-default',
  templateUrl: './color-palette-view-default.component.html',
  styleUrls: ['./color-palette-view-default.component.less']
})
export class ColorPaletteViewDefaultComponent implements OnInit {
  @Input() group: CacheGroup;

  getHexCodeColor(token: CacheToken) {
    return chroma(token.color).luminance() > 0.4 ? "#000" : "#fff";
  }

  getRGB(hex: string) {
    return chroma(hex).rgb().join(' / ');
  }

  constructor() {}

  ngOnInit() {}
}
