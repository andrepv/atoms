import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorPaletteTokenModel } from '@colors/color-palette-section/color-palette.model';
import { StoreToken } from '@core/core.model';

@Component({
  selector: 'app-color-picker-preset',
  templateUrl: './color-picker-preset.component.html',
  styleUrls: ['./color-picker-preset.component.less']
})
export class ColorPickerPresetPresetComponent implements OnInit {
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
