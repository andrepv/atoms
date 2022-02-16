import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ColorPaletteDBToken, ColorPaletteCacheToken } from '../color-palette-section/color-palette.model';
import { EditableContent, CacheGroup } from '@core/core-types';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { StorageGroup } from '@core/storages/storages-types';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-color-palette-editor',
  templateUrl: './color-palette-editor.component.html',
  styleUrls: ['./color-palette-editor.component.less'],
})
export class ColorPaletteEditorComponent implements OnInit {
  @Input() content: EditableContent<ColorPaletteCacheToken, CacheGroup<StorageGroup, ColorPaletteCacheToken>>;

  colorChange$ = new Subject<void>();
  colorSave$ = new Subject<void>();

  contrastColor = "#fff";

  get token() {
    return this.content.token;
  }

  get group() {
    return this.content.group;
  }

  constructor(private tokens: SectionManagerTokensService<ColorPaletteDBToken, StorageGroup>) {}

  ngOnInit() {}

  changeColor(value: string) {
    this.token.color = value;
    this.colorChange$.next()
  }

  async saveColor() {
    await this.tokens.storage.update(this.token.id, {color: this.token.color});

    if (this.token.isPrimary) {
      this.colorSave$.next();
    }
  }
}
