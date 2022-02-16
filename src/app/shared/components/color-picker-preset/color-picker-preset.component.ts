import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorPaletteDBToken } from '@colors/color-palette-section/color-palette.model';
import { CacheToken } from '@core/core-types';
import { SectionContentEditorService } from '@core/services/section-content-editor.service';

@Component({
  selector: 'app-color-picker-preset',
  templateUrl: './color-picker-preset.component.html',
  styleUrls: ['./color-picker-preset.component.less']
})
export class ColorPickerPresetPresetComponent implements OnInit {
  @Input() tokens: CacheToken<ColorPaletteDBToken>[];
  @Input() view: 'list' | 'grid';
  @Output() colorSelect: EventEmitter<string> = new EventEmitter();

  excludedTokenId = 0;

  constructor(private editor: SectionContentEditorService) {}

  ngOnInit() {
    if (this.editor.section === "Color Palette") {
      this.excludedTokenId = this.editor.content.token.id;
    }
  }
}
