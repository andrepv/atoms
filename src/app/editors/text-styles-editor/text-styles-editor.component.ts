import { Component, OnInit } from '@angular/core';
import { EditorService } from '../../layout/editor/editor.service';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';

export type TextStyleOption = {styleProp: string, tokenId: number};

@Component({
  selector: 'app-text-styles-editor',
  template: `
    <div>
      <app-text-style-select
        *ngFor="let section of SECTIONS"
        [section]="section"
        [editableTokenValue]="(editor.content$ | async).token.value"
        (change)="setTokenValue($event)"
      ></app-text-style-select>
    </div>
  `,
  styleUrls: ['./text-styles-editor.component.less'],
  providers: [
    {provide: 'tables', useValue: db.textStyles},
    ContentManagerService
  ]
})
export class TextStylesEditorComponent implements OnInit {
  SECTIONS = ["Type Face", "Type Scale", "Line Height", "Letter Spacing"];

  constructor(
    private cm: ContentManagerService,
    private editor: EditorService,
  ) {}

  ngOnInit() {}

  setTokenValue({styleProp, tokenId}: TextStyleOption) {
    const {
      token: editableToken,
      group: editableGroup
    } = this.editor.content;

    const value = {...editableToken.value, [styleProp]: tokenId}

    this.cm.setTokenValue(value, editableToken.id, editableGroup.id);
  }
}
