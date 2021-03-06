import { Component, Input, OnInit } from '@angular/core';
import { CacheGroup, CacheToken } from '@core/core-types';
import chroma from 'chroma-js';

@Component({
  selector: 'app-color-palette-view-grouped',
  templateUrl: './color-palette-view-grouped.component.html',
  styleUrls: ['./color-palette-view-grouped.component.less']
})
export class ColorPaletteViewGroupedComponent implements OnInit {
  @Input() group: CacheGroup;

  getHexCodeColor(token: CacheToken) {
    return chroma(token.color).luminance() > 0.4 ? "#000" : "#fff";
  }

  constructor() {}

  ngOnInit() {}

}
