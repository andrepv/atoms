import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditorService } from '@core/services/editor.service';
import { TextPreviewService } from '../text-preview/text-preview.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { DBGroup } from '@core/core.model';
import { TextStylesTokenModel, TextStylesTokenValue, TEXTSTYLES_DB_DATA } from '@typography/text-styles/text-styles.model';
import { provideEditorDeps } from '@utils/provide-editor-deps';
import { TextPreviewStyleProps } from '@typography/text-preview/text-preview.model';

@Component({
  selector: 'app-text-styles-editor',
  templateUrl: './text-styles-editor.component.html',
  styleUrls: ['./text-styles-editor.component.less'],
  providers: [...provideEditorDeps(TEXTSTYLES_DB_DATA.tableGroupName)]
})
export class TextStylesEditorComponent implements OnInit {
  get editableToken() {
    return this.editor.content.token;
  }

  private destroy$ = new Subject();

  constructor(
    public editor: EditorService<TextStylesTokenModel, DBGroup>,
    private section: SectionContentManagerService<TextStylesTokenModel, DBGroup>,
    private preview: TextPreviewService,
  ) {}

  text = this.getTextValue();

  ngOnInit() {
    this.editor.content$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => this.text = this.getTextValue())
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getStyleTokenId(styleProp: string) {
    const styles = this.editableToken.value.styles;
    return !styles ? null : styles[styleProp];
  }

  
  async onChange(tokenId: number, styleProp: TextPreviewStyleProps) {
    await this.setTokenValue({
      styles: {
        ...this.editableToken.value.styles,
        [styleProp]: tokenId
      }
    });

    this.preview.setPreviewStyleRef(
      this.editableToken.id,
      styleProp,
      tokenId
    )
  }

  async onBlur() {
    const inputValue = this.text.trim();

    if (inputValue.length && inputValue !== this.editableToken.value.text) {
      await this.setTokenValue({text: inputValue});
      this.preview.setPreviewText(this.editableToken.id, inputValue)

    } else {
      this.text = this.getTextValue();
    }
  }

  private async setTokenValue(obj: TextStylesTokenValue) {
    const {group} = this.editor.content;
    const value = {...this.editableToken.value}
  
    for (let key in obj) {
      value[key] = obj[key];
    }
  
    await this.section.setTokenValue(value, this.editableToken.id, group.id);
  }

  private getTextValue() {
    return this.editableToken.value.text || this.preview.DEFAULT_PREVIEW.text;
  }
}
