import { Component, Input, OnInit } from '@angular/core';
import { SectionContentEditorService } from '@core/services/section-content-editor.service';
import { ExplorerService } from '@app/components/explorer/explorer.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less']
})
export class PageComponent implements OnInit {
  @Input() name: string

  constructor(
    private editor: SectionContentEditorService,
    private explorer: ExplorerService,
  ) {}

  ngOnInit() {
    this.explorer.onPageInit()
  }

  ngOnDestroy() {
    if (this.editor.isActive) {
      this.editor.disable();
    }

    this.explorer.onPageDestroy();
  }
}
