import { Component, Input, OnInit } from '@angular/core';
import { StoreToken } from '@core/core.model';
import { TextPreviewStyles } from '@typography/text-preview/text-preview.model';
import { TextPreviewService } from '@typography/text-preview/text-preview.service';
import { Subscription } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { TextStylesTokenModel } from '../text-styles-section/text-styles.model';

@Component({
  selector: 'app-text-styles-token',
  template: `<app-text-preview [preview]="preview"></app-text-preview>`,
})
export class TextStylesTokenComponent implements OnInit {
  @Input() token: StoreToken<TextStylesTokenModel>;
  preview = this.previewManager.DEFAULT_PREVIEW;

  subscription: Subscription;

  constructor(private previewManager: TextPreviewService) {}

  ngOnInit() {
    this.subscription = this.previewManager.isStyleSourceLoaded$.pipe(
      take(this.previewManager.sectionsToLoadCount),
      finalize(() => setTimeout(() => this.onSectionsLoad(), 0))
    ).subscribe()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private onSectionsLoad() {
    this.preview = {
      styles: this.transformRefsToStyles(), 
      text: this.getPreviewText(),
      styleRefs: this.token.value.styles || false,
    }

    const globalPreview = this.previewManager.getPreview(this.token.id);

    if (globalPreview) {
      this.previewManager.updatePreview(this.token.id, {
        styles: this.preview.styles,
        text: this.preview.text,
        styleRefs: this.preview.styleRefs
      })
    
      this.preview = globalPreview;
    } else {
      this.previewManager.addPreview(this.token.id, this.preview)
    }
  }

  private getPreviewText() {
    return this.token.value.text || this.previewManager.DEFAULT_PREVIEW.text;
  }

  private transformRefsToStyles() {
    const styles = {};
    const styleProps = Object.keys(this.previewManager.DEFAULT_PREVIEW.styles);
    const styleRefs = this.token.value.styles || {};

    for (let styleProp of styleProps) {
      const savedStyleTokenId = styleRefs[styleProp] ?? false;

      styles[styleProp] = !savedStyleTokenId
        ? this.previewManager.DEFAULT_PREVIEW.styles[styleProp]
        : this.previewManager.getTokenStyleValue(styleProp, savedStyleTokenId)

    }
    return styles as TextPreviewStyles;
  }

}
