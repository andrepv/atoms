import { Component, Input, OnInit } from '@angular/core';
import { FontType, TypefaceDBToken, TypefaceTokenValue } from '../typeface-section/typeface.model';
import { EditableSectionContent } from '@core/core-types';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { StorageGroup } from '@core/storages/storages-types';

@Component({
  selector: 'app-typeface-editor',
  templateUrl: './typeface-editor.component.html',
  styleUrls: ['./typeface-editor.component.less'],
})
export class TypefaceEditorComponent implements OnInit {
  @Input() content: EditableSectionContent<TypefaceDBToken, StorageGroup>;
  radioValue: FontType | "loaded-fonts" = "google-fonts";

  constructor(private tokens: SectionManagerTokensService<TypefaceDBToken, StorageGroup>) {}

  ngOnInit() {}

  saveFont(font: TypefaceTokenValue) {
    for (let key in font) {
      this.tokens.update(this.content.token, {[key]: font[key]});
    }
  }
}