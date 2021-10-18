import { Component, OnInit } from '@angular/core';
import { EditorService } from '../../layout/editor/editor.service';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';
import { SECTIONS, StoreService, Token } from '../../services/store.service';

import { SectionNames } from "../../services/store.service";

type Option = {
  section: SectionNames,
  selected: number,
  tokens: Token[],
  isActive: boolean,
  placeHolder: string,
  style: string
}

@Component({
  selector: 'app-text-styles-editor',
  templateUrl: './text-styles-editor.component.html',
  styleUrls: ['./text-styles-editor.component.less'],
  providers: [
    {provide: 'tables', useValue: db.textStyles},
    ContentManagerService
  ]
})
export class TextStylesEditorComponent implements OnInit {
  options: Option[] = [
    {
      section: "Type Face",
      selected: null,
      tokens: [],
      isActive: true,
      placeHolder: "select font family",
      style: "fontFamily",
    },
    {
      section: "Type Scale",
      selected: null,
      tokens: [],
      isActive: true,
      placeHolder: "select font size",
      style: "fontSize",
    },
    {
      section: "Line Height",
      selected: null,
      tokens: [],
      isActive: true,
      placeHolder: "select line height",
      style: "lineHeight",
    },
    {
      section: "Letter Spacing",
      selected: null,
      tokens: [],
      isActive: true,
      placeHolder: "select letter spacing",
      style: "letterSpacing",
    },
  ]

  get editableContent() {
    return this.editor.content;
  }

  constructor(
    private store: StoreService,
    private cm: ContentManagerService,
    private editor: EditorService,
  ) {}

  ngOnInit() {
    const options = this.getOptionsMap();
    const sections = SECTIONS.filter(section => Boolean(options[section]))

    for (let section of sections) {
      const option = options[section];
      const tokens = this.store.getSectionTokens(section);
      const selectedTokenId = this.editableContent.token.value[option.style];

      if (!tokens.length) {
        option.isActive = false
      }

      option.tokens = tokens;

      if (selectedTokenId !== 0) {
        option.selected = selectedTokenId;
      }
    }

    this.options = Object.values(options);
  }

  onOptionChange(style: string, tokenId: number) {
    const {
      token: editableToken,
      group: editableGroup
    } = this.editableContent;

    const prevTokenValue = {}
    this.options.map(option => prevTokenValue[option.style] = Number(option.selected))

    const nextTokenValue = {
      ...editableToken.value,
      ...prevTokenValue,
      [style]: tokenId
    }

    this.cm.setTokenValue(
      nextTokenValue,
      editableToken.id,
      editableGroup.id
    );
  }

  private getOptionsMap(): {[section: string]: Option} {
    let map = {};
    this.options.map(option => map[option.section] = option);
    return map;
  }
}
