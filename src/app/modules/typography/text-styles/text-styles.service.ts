import { Injectable } from '@angular/core';
import { SectionNames, StoreService } from '@core/services/store.service';
import { FontModel } from '../typeface/typeface.model';

@Injectable({providedIn: 'root'})
export class TextStylesService {
  readonly DEFAULT_TEXT_STYLE_VALUE = {
    styles: {
      fontFamily: 'Arial',
      fontSize: 35,
      lineHeight: 1.5,
      letterSpacing: 0,
    },
    text: 'Quick brown fox jumped over the lazy red dog'
  }

  private readonly STYLES = {
    fontFamily: {
      get: (value: string | FontModel) => typeof value  === 'string' ? value : value.family,
      section: "Type Face"
    },
    fontSize: {
      get: (value: number) => `${value}px`,
      section: "Type Scale"
    },
    lineHeight: {
      get: (value: number) => value,
      section: "Line Height"
    },
    letterSpacing: {
      get: (value: number) => `${value}em`,
      section: "Letter Spacing"
    }
  }

  constructor(private store: StoreService) {}

  getGroupTextStyles(groupId: number, sectionName: SectionNames) {
    const group = this.store.getGroup(sectionName, groupId);
    if (!group) return;

    const textStylesToken = this.store.getSectionToken("Text Styles", group.state.textPreviewId);

    if (textStylesToken) return textStylesToken.value;

    return {}
  }

  getStyle(styleProp: string, styleTokenId: number) {
    const section = this.STYLES[styleProp].section;
    const token = this.store.getSectionToken(section, styleTokenId);

    return token
      ? this.STYLES[styleProp].get(token.value)
      : this.getDefaultStyle(styleProp);
  }

  getDefaultStyle(styleProp: string) {
    const defaultValue = this.DEFAULT_TEXT_STYLE_VALUE.styles[styleProp];
    return this.STYLES[styleProp].get(defaultValue);
  }

  getDefaultText() {
    return this.DEFAULT_TEXT_STYLE_VALUE.text;
  }
}
