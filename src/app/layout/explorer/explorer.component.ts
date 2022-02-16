import { Component, OnInit } from '@angular/core';
import { SectionContentEditorService } from '@core/services/section-content-editor.service';
import { SectionManagerCachedContentService  } from '@core/services/section-manager-cached-content.service';
import { ExplorerService } from './explorer.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.less']
})
export class ExplorerComponent implements OnInit {
  constructor(
    public cache: SectionManagerCachedContentService,
    public editor: SectionContentEditorService,
    public explorer: ExplorerService
  ) {}

  ngOnInit() {}
}
