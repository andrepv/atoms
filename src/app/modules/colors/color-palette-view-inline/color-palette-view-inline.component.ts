import { Component, Input, OnInit } from '@angular/core';
import { SectionContentEditorService } from '@core/services/section-content-editor.service';
import { CacheGroup } from '@core/core-types';
import SectionManagerContentService from '@core/services/section-manager-content.service';

@Component({
  selector: 'app-color-palette-view-inline',
  templateUrl: './color-palette-view-inline.component.html',
  styleUrls: ['./color-palette-view-inline.component.less']
})
export class ColorPaletteViewInlineComponent implements OnInit {
  @Input() group: CacheGroup;

  constructor(
    public editor: SectionContentEditorService,
    public section: SectionManagerContentService,
  ) { }

  ngOnInit() {}

}
