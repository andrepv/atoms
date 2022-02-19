import { Component, Input, OnInit } from '@angular/core';
import SectionManagerGroupsService from '@app/core/services/section-manager-groups.service';
import { CacheGroup } from '@core/core-types';
import { TextStylesDBToken, TextStylesDBGroup } from '../text-styles-section/text-styles.model';

@Component({
  selector: 'app-text-styles-editor-group',
  templateUrl: './text-styles-editor-group.component.html',
  styleUrls: ['./text-styles-editor-group.component.less']
})
export class TextStylesEditorGroupComponent implements OnInit {
  @Input() group: CacheGroup<TextStylesDBGroup, TextStylesDBToken>;

  text = '';
  color = '';
  backgroundColor = '';

  constructor(private groups: SectionManagerGroupsService) { }

  ngOnInit() {
    this.text = this.group.text;
    this.color = this.group.color;
    this.backgroundColor = this.group.backgroundColor;
  }

  setPreviewText() {
    const inputValue = this.text.trim();

    if (inputValue.length && inputValue !== this.group.text) {
      this.groups.update(this.group, {text: inputValue})
    } else {
      this.text = this.group.text;
    }
  }

  setFontFamily(typefaceId: number) {
    return this.groups.update(this.group, {typefaceId});   
  }

  changeTextColor(value: string) {
    this.color = value;
  }

  changeBackgroundColor(value: string) {
    this.backgroundColor = value;
  }
}
