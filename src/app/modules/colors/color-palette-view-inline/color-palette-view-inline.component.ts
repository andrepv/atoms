import { Component, Input, OnInit } from '@angular/core';
import { CacheGroup } from '@core/core-types';

@Component({
  selector: 'app-color-palette-view-inline',
  templateUrl: './color-palette-view-inline.component.html',
  styleUrls: ['./color-palette-view-inline.component.less']
})
export class ColorPaletteViewInlineComponent implements OnInit {
  @Input() group: CacheGroup;

  constructor() { }

  ngOnInit() {}

}
