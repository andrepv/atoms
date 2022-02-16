import { Component, OnInit } from '@angular/core';
import { EditorService } from '@core/services//editor.service';
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
    public editor: EditorService,
    public explorer: ExplorerService
  ) {}

  ngOnInit() {}
}
