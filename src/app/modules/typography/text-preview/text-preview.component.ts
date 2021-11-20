import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { StoreGroup } from '@core/core.model';
import { TextPreviewService } from './text-preview.service';

@Component({
  selector: 'app-text-preview',
  templateUrl: 'text-preview.component.html',
  styleUrls: ['./text-preview.component.less']
})
export class TextPreviewComponent implements OnInit {
  @Input() templateRef: TemplateRef<any>;

  @Input() set group(group: StoreGroup) {
    if (group) {
      this.preview = this.getTextPreview(group);
    }
  };

  @Input() preview = this.manager.DEFAULT_PREVIEW;

  constructor(private manager: TextPreviewService) {}

  ngOnInit() {}

  private getTextPreview(group: StoreGroup) {
    const defaultPreview = {...this.manager.DEFAULT_PREVIEW};

    if (!group.state) return defaultPreview;

    const previewId = group.state.textPreviewId;

    if (!previewId) return defaultPreview;

    if (!this.manager.hasPreview(previewId)) {
      this.manager.addPreview(previewId, defaultPreview)
    }
    return this.manager.getPreview(previewId);
  }
}
