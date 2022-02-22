import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { CacheGroup, CacheToken } from '@core/core-types';
import { SectionContentEditorService } from '@core/services/section-content-editor.service';
import SectionManagerContentService from '@core/services/section-manager-content.service';
import chroma from 'chroma-js';

@Component({
  selector: 'app-color-token-view-inline',
  templateUrl: './color-token-view-inline.component.html',
  styleUrls: ['./color-token-view-inline.component.less']
})
export class ColorTokenViewInlineComponent implements OnInit {
  @Input() group: CacheGroup;
  @Input() token: CacheToken;
  @Input() tooltipPosition = "top";
  @Input() isEditable = false;

  constructor(
    private section: SectionManagerContentService,
    private editor: SectionContentEditorService,
  ) {}

  ngOnInit() {}

  getHexCodeColor(color: string) {
    return chroma(color).luminance() > 0.4 ? "#000" : "#fff";
  }

  openEditor(editorTemplateRef: TemplateRef<any>) {
    this.editor.enable(
      this.section.name,
      {group: this.group, token: this.token},
      editorTemplateRef
    )
  }

}
