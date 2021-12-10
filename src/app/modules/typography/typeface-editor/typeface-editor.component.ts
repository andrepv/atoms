import { Component, Input, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { Subscription } from 'rxjs';
import { EditorService } from '@core/services/editor.service';
import { FontType, TypefaceTokenModel, TypefaceTokenValue, TYPEFACE_DB_DATA } from '../typeface-section/typeface.model';
import { DBGroup, EditableContent } from '@core/core.model';
import { TextPreviewService } from '@typography/text-preview/text-preview.service';

@Component({
  selector: 'app-typeface-editor',
  templateUrl: './typeface-editor.component.html',
  styleUrls: ['./typeface-editor.component.less'],
})
export class TypefaceEditorComponent implements OnInit {
  @Input() content: EditableContent;
  radioValue: FontType | "loaded-fonts" = "google-fonts";

  constructor(
    private section: SectionContentManagerService<TypefaceTokenModel, DBGroup>,
  ) {}

  ngOnInit() {}

  saveFont(font: TypefaceTokenValue) {
    for (let key in font) {
      this.section.updateToken(this.content.token, this.content.group, {
        [key]: font[key]
      });
    }
  }
}