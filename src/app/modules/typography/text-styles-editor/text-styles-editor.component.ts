import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditorService } from '@core/services/editor.service';
import { TextStylesService } from '../text-styles/text-styles.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { DBGroup } from '@core/core.model';
import { TextStylesTokenModel, TextStylesTokenValue, TEXTSTYLES_DB_DATA } from '@typography/text-styles/text-styles.model';
import { provideEditorDeps } from '@utils/provide-editor-deps';

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
    private service: TextStylesService,
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

  
  onChange(tokenId: number, styleProp: string) {
    this.setTokenValue({styles: {
      ...this.editableToken.value.styles,
      [styleProp]: tokenId
    }});
  }

  onBlur() {
    const inputValue = this.text.trim();

    if (inputValue.length && inputValue !== this.editableToken.value.text) {
      this.setTokenValue({text: inputValue});
    } else {
      this.text = this.getTextValue();
    }
  }

  private setTokenValue(obj: TextStylesTokenValue) {
    const {group} = this.editor.content;
    const value = {...this.editableToken.value}
  
    for (let key in obj) {
      value[key] = obj[key];
    }
  
    this.section.setTokenValue(value, this.editableToken.id, group.id);
  }

  private getTextValue() {
    return this.editableToken.value.text || this.service.getDefaultText();
  }
}
