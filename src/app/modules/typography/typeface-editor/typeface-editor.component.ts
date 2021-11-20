import { Component, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { Subscription } from 'rxjs';
import { EditorService } from '@core/services/editor.service';
import { FontType, TypefaceTokenModel, TypefaceTokenValue, TYPEFACE_DB_DATA } from '../typeface/typeface.model';
import { DBGroup } from '@core/core.model';
import { provideEditorDeps } from '@utils/provide-editor-deps';
import { TextPreviewService } from '@typography/text-preview/text-preview.service';

@Component({
  selector: 'app-typeface-editor',
  templateUrl: './typeface-editor.component.html',
  styleUrls: ['./typeface-editor.component.less'],
  providers: [...provideEditorDeps(TYPEFACE_DB_DATA.tableGroupName)]
})
export class TypefaceEditorComponent implements OnInit {
  tokenName = '';
  subscription: Subscription;

  radioValue: FontType | "loaded-fonts" = "google-fonts";

  get content() {
    return this.editor.content;
  }

  constructor(
    public section: SectionContentManagerService<TypefaceTokenModel, DBGroup>,
    public editor: EditorService<TypefaceTokenModel, DBGroup>,
    private textPreview: TextPreviewService,
  ) {}

  ngOnInit() {
    this.subscription = this.editor.content$.subscribe(value => this.tokenName = value?.token.name ?? '');

    this.section.configure({
      contentManagerConfigs: {
        onTokenValueChange: (value, token) => {
          this.textPreview.setPreviewStyleValue(
            {fontFamily: value.family},
            token.id
          )
        },
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  async onBlur() {
    const {token, group} = this.content;
    if (!this.tokenName.length || this.tokenName === token.name) {
      this.tokenName = token.name;
      return;
    }
    try {
      await this.section.renameToken(this.tokenName, token.id, group.id);
    } catch {
      this.tokenName = token.name;
    }
  }

  saveFont(font: TypefaceTokenValue) {
    this.section.setTokenValue(
      font,
      this.content.token.id,
      this.content.group.id
    );
  }
}