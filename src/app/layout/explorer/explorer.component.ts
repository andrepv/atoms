import { Component, OnInit } from '@angular/core';
import { EditorService } from '@core/services//editor.service';
import { StoreService } from '@core/services/store.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.less']
})
export class ExplorerComponent implements OnInit {
  constructor(
    public store: StoreService,
    public editor: EditorService
  ) {}

  ngOnInit() {}
}
