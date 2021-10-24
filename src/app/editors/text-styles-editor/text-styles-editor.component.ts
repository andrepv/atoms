import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditorService } from '../../layout/editor/editor.service';
import { TextStylesService } from '../../sections/text-styles/text-styles.service';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';

@Component({
  selector: 'app-text-styles-editor',
  template: `
    <div>
      <app-section-tokens-select
        section="Type Face"
        [selectedTokenId]="getStyleTokenId('fontFamily')"
        (change)="onChange($event, 'fontFamily')"
      ></app-section-tokens-select>

      <app-section-tokens-select
        section="Type Scale"
        [selectedTokenId]="getStyleTokenId('fontSize')"
        (change)="onChange($event, 'fontSize')"
      ></app-section-tokens-select>

      <app-section-tokens-select
        section="Line Height"
        [selectedTokenId]="getStyleTokenId('lineHeight')"
        (change)="onChange($event, 'lineHeight')"
      ></app-section-tokens-select>

      <app-section-tokens-select
        section="Letter Spacing"
        [selectedTokenId]="getStyleTokenId('letterSpacing')"
        (change)="onChange($event, 'letterSpacing')"
      ></app-section-tokens-select>

      <p>Text</p>
      <textarea rows="4" nz-input [(ngModel)]="text" (blur)="onBlur()"></textarea>
    </div>
  `,
  styleUrls: ['./text-styles-editor.component.less'],
  providers: [
    {provide: 'tables', useValue: db.textStyles},
    ContentManagerService
  ]
})
export class TextStylesEditorComponent implements OnInit {

  get editableToken() {
    return this.editor.content.token;
  }

  private destroy$ = new Subject();

  constructor(
    private cm: ContentManagerService,
    private service: TextStylesService,
    public editor: EditorService,
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

  private setTokenValue(obj: {[key: string]: any}) {
    const {group} = this.editor.content;
    const value = {...this.editableToken.value}

    for (let key in obj) {
      value[key] = obj[key];
    }

    this.cm.setTokenValue(value, this.editableToken.id, group.id);
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

  private getTextValue() {
    return this.editableToken.value.text || this.service.getDefaultText();
  }
}
