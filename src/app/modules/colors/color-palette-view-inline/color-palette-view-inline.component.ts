import { Component, Input, OnInit } from '@angular/core';
import { StoreGroup } from '@core/core-types';

@Component({
  selector: 'app-color-palette-view-inline',
  templateUrl: './color-palette-view-inline.component.html',
  styleUrls: ['./color-palette-view-inline.component.less']
})
export class ColorPaletteViewInlineComponent implements OnInit {
  @Input() group: StoreGroup;

  constructor() { }

  ngOnInit() {}

}
