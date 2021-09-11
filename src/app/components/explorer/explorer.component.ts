import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.less']
})
export class ExplorerComponent implements OnInit {
  constructor(public store: StoreService) {}
  ngOnInit() {}
}
