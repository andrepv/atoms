import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { StoreGroup, StoreToken } from '@core/core-types';
import { EditorService } from '@core/services/editor.service';
import SectionManagerContentService from '@core/services/section-manager-content.service';
import chroma from 'chroma-js';

@Component({
  selector: 'app-color-token-view-inline',
  templateUrl: './color-token-view-inline.component.html',
  styleUrls: ['./color-token-view-inline.component.less']
})
export class ColorTokenViewInlineComponent implements OnInit {
  @Input() group: StoreGroup;
  @Input() token: StoreToken;
  @Input() tooltipPosition = "top";

  constructor(
    private section: SectionManagerContentService,
    private editor: EditorService,
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
