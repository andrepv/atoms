import { Injectable } from '@angular/core';
import { DBToken, SectionNames } from '@core/core.model';
import { StoreService } from '@core/services/store.service';
import { ReplaySubject } from 'rxjs';
import { TextPreview, TextPreviewStyleProps, TextPreviewStyles, TextPreviewStyleValue } from './text-preview.model';

type StyleSource<T extends DBToken = any> = {
  [K in TextPreviewStyleProps]?: {
    getValue(token: T): TextPreviewStyles[K];
    section: SectionNames
  }
} | null;

@Injectable()
export class TextPreviewService {
  sectionsToLoadCount = 4;
  isStyleSourceLoaded$ = new ReplaySubject<boolean>(this.sectionsToLoadCount);

  readonly DEFAULT_PREVIEW: TextPreview = {
    styles: {
      fontFamily: 'Arial',
      fontSize: `35px`,
      lineHeight: 1.5,
      letterSpacing: `0em`,
    },
    text: 'Quick brown fox jumped over the lazy red dog',
    styleRefs: false,
    backgroundColor: '#35343d',
    color: '#e3e3e3',
  }

  private styleSources: StyleSource = null;

  private previewList: {
    [previewId: number]: TextPreview
  } = {};

  constructor(private store: StoreService) {}

  resetState() {
    this.isStyleSourceLoaded$ = new ReplaySubject<boolean>(this.sectionsToLoadCount);
    this.previewList = {};
  }

  addPreview(id: number, value: TextPreview) {
    this.previewList[id] = value;
  }

  deletePreview(id: number) {
    this.updatePreview(id, this.DEFAULT_PREVIEW);
  }

  hasPreview(id: number) {
    return Boolean(this.previewList[id]);
  }

  getPreview(id: number) {
    return this.previewList[id]
  }

  updatePreview(id: number, value: Partial<TextPreview>) {
    const preview = this.getPreview(id);
    if (preview) {
      for (let k in value) {
        preview[k] = value[k]
      }
      return true;
    }
    return false;
  }

  setPreviewText(previewId: number, value: string) {
    const preview = this.getPreview(previewId);
    if (preview) {
      preview.text = value;
    }
  }

  setPreviewBackgroundColor(previewId: number, value: string) {
    const preview = this.getPreview(previewId);
    if (preview) {
      preview.backgroundColor = value;
    }
  }

  setPreviewColor(previewId: number, value: string) {
    const preview = this.getPreview(previewId);
    if (preview) {
      preview.color = value;
    }
  }

  setPreviewStyleValue(
    style: {[K in TextPreviewStyleProps]?: TextPreviewStyles[K]},
    tokenId: number
  ) {
    this.getPreviewByStyleRef(tokenId, preview => {
      preview.styles = {...preview.styles, ...style};
    })
  }

  deletePreviewStyle(styleProp: TextPreviewStyleProps, tokenId: number) {
    this.getPreviewByStyleRef(tokenId, preview => {
      preview.styles = {
        ...preview.styles,
        [styleProp]: this.DEFAULT_PREVIEW.styles[styleProp]
      };
    })
  }

  setPreviewStyleRef(
    previewId: number,
    styleProp: TextPreviewStyleProps,
    tokenId: number
  ) {
    const styleValue = this.getTokenStyleValue(styleProp, tokenId);
    if (!styleValue) return;

    const preview = this.getPreview(previewId);

    preview.styles = {...preview.styles, [styleProp]: styleValue};

    if (!preview.styleRefs) {
      preview.styleRefs = {};
    }

    preview.styleRefs[styleProp] = tokenId;
  }

  registerStyleSource<T extends DBToken>(
    styleProp: keyof StyleSource,
    value: StyleSource<T>[keyof StyleSource]
  ) {
    if (!this.styleSources) {
      this.styleSources = {};
    }

    this.styleSources[styleProp] = value as any
  }

  getTokenStyleValue(
    styleProp: string,
    tokenId: number
  ): TextPreviewStyleValue {
    if (this.styleSources) {
      const styleSource = this.styleSources[styleProp];
      const section = styleSource.section;
      const token = this.store.getSectionToken(section, tokenId);
      if (!token) return this.DEFAULT_PREVIEW.styles[styleProp]

      return styleSource.getValue(token);
    }
  }

  private getPreviewByStyleRef(
    ref: number,
    callback: (text: TextPreview) => void
  ) {
    for (let previewId in this.previewList) {
      const preview = this.previewList[previewId];
      if (preview.styleRefs) {
        if (Object.values(preview.styleRefs).includes(ref)) {
          callback(preview);
        }
      }
    }
  }
}
