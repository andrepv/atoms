import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorPaletteTokenModel } from '@colors/color-palette/color-palette.model';
import { StoreToken } from '@core/core.model';

@Component({
  selector: 'app-preset-colors',
  templateUrl: './preset-colors.component.html',
  styleUrls: ['./preset-colors.component.less']
})
export class PresetColorsComponent implements OnInit {
  @Input() tokens: StoreToken<ColorPaletteTokenModel>[];
  @Output() colorSelect: EventEmitter<string> = new EventEmitter();
  
  constructor() {}

  ngOnInit() {}

  getTintsByIds(ids: number[]) {
    return this.tokens.filter(({id}) => ids.includes(id)).reverse()
  }

  getShadesByIds(ids: number[]) {
    return this.tokens.filter(({id}) => ids.includes(id))
  }
}
