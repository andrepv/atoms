import { Component, OnInit } from '@angular/core';
import { ExplorerService} from './explorer.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.less']
})
export class ExplorerComponent implements OnInit {
  constructor(public service: ExplorerService) {}

  get section() {
    return this.service.section;
  }

  ngOnInit() {}
}
