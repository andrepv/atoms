import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorPaletteDBToken } from '@colors/color-palette-section/color-palette.model';
import { StoreToken } from '@core/core.model';
import { EditorService } from '@core/services/editor.service';

@Component({
  selector: 'app-color-picker-preset',
  templateUrl: './color-picker-preset.component.html',
  styleUrls: ['./color-picker-preset.component.less']
})
export class ColorPickerPresetPresetComponent implements OnInit {
  @Input() tokens: StoreToken<ColorPaletteDBToken>[];
  @Input() view: 'list' | 'grid';
  @Output() colorSelect: EventEmitter<string> = new EventEmitter();

  excludedTokenId = 0;

  constructor(private editor: EditorService) {}

  ngOnInit() {
    if (this.editor.section === "Color Palette") {
      this.excludedTokenId = this.editor.content.token.id;
    }
  }
}
