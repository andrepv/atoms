import { Component, OnInit } from '@angular/core';
import { EditorService } from '@core/services//editor.service';
import { StoreService } from '@core/services/store.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.less']
})
export class ExplorerComponent implements OnInit {
  // get pageContent() {
  //   return Object.entries(this.store.page.content).map(([name, content]) => ({name, content}))
  // }

  constructor(
    public store: StoreService,
    public editor: EditorService
  ) {}

  ngOnInit() {}
}
