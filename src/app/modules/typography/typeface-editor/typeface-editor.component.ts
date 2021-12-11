import { Component, Input, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { FontType, TypefaceDBToken, TypefaceTokenValue } from '../typeface-section/typeface.model';
import { DBGroup, EditableContent } from '@core/core.model';

@Component({
  selector: 'app-typeface-editor',
  templateUrl: './typeface-editor.component.html',
  styleUrls: ['./typeface-editor.component.less'],
})
export class TypefaceEditorComponent implements OnInit {
  @Input() content: EditableContent<TypefaceDBToken, DBGroup>;
  radioValue: FontType | "loaded-fonts" = "google-fonts";

  constructor(private section: SectionContentManagerService<TypefaceDBToken, DBGroup>) {}

  ngOnInit() {}

  saveFont(font: TypefaceTokenValue) {
    for (let key in font) {
      this.section.updateToken(this.content.token, this.content.group, {
        [key]: font[key]
      });
    }
  }
}