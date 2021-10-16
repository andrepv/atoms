import { Component, Inject, OnInit } from '@angular/core';
import { ContentManagerService } from '../../services/content-manager.service';
import { db, TypefaceGroupTable, TypefaceTokenTable } from '../../services/db.service';
import { StoreService } from '../../services/store.service';
import { Subscription } from 'rxjs';
import { CustomFont } from './custom-fonts/custom-font.component';
import { GoogleFont } from './google-fonts/google-fonts.component';
import { EditorService } from '../../layout/editor/editor.service';

export type FontType = 'google-fonts' | 'custom-font';

export interface FontModel {
  family: string,
  type: FontType
}

@Component({
  selector: 'app-typeface-editor',
  templateUrl: './typeface-editor.component.html',
  styleUrls: ['./typeface-editor.component.less'],
  providers: [
    {provide: 'tables', useValue: db.typeface},
    ContentManagerService
  ]
})
export class TypefaceEditorComponent implements OnInit {
  tokenName = '';
  subscription: Subscription;

  radioValue: FontType | "loaded-fonts" = "google-fonts";

  get content() {
    return this.editor.content;
  }

  constructor(
    public contentManager: ContentManagerService<TypefaceTokenTable, TypefaceGroupTable>,
    public store: StoreService,
    public editor: EditorService,
  ) {}

  ngOnInit() {
    this.subscription = this.editor.content$.subscribe(value => this.tokenName = value?.token.name ?? '');
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
      await this.contentManager.renameToken(this.tokenName, token.id, group.id);
    } catch {
      this.tokenName = token.name;
    }
  }

  saveFont(font: CustomFont | GoogleFont) {
    this.contentManager.setTokenValue(
      font,
      this.content.token.id,
      this.content.group.id
    );
  }
}