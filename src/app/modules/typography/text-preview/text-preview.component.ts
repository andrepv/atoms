import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { TextPreviewService } from './text-preview.service';

@Component({
  selector: 'app-text-preview',
  templateUrl: 'text-preview.component.html',
  styleUrls: ['./text-preview.component.less']
})
export class TextPreviewComponent implements OnInit {
  @Input() templateRef: TemplateRef<any>;

  @Input() set textPreviewId(value: number) {
    this.preview = this.getTextPreview(value);
  }

  @Input() preview = this.manager.DEFAULT_PREVIEW;

  get styles() {
    return {
      ...this.preview.styles,
      color: this.preview.color,
      backgroundColor: this.preview.backgroundColor
    }
  }

  constructor(private manager: TextPreviewService) {}

  ngOnInit() {}

  private getTextPreview(previewId: number) {
    const defaultPreview = {...this.manager.DEFAULT_PREVIEW};

    if (!previewId) return defaultPreview;

    if (!this.manager.hasPreview(previewId)) {
      this.manager.addPreview(previewId, defaultPreview)
    }
    return this.manager.getPreview(previewId);
  }
}
