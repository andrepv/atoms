import { Component, OnInit } from '@angular/core';
import { StoreService } from '@core/services/store.service';

@Component({
  selector: 'app-borders',
  templateUrl: './borders.component.html',
  styleUrls: ['./borders.component.less']
})
export class BordersComponent implements OnInit {
  readonly PAGE_NAME = "Borders";

  constructor(private store: StoreService) {}

  ngOnInit() {
    this.store.setPageStructure({
      name: this.PAGE_NAME,
      content: {
        "Border Radius": [],
      }
    });
  }
}
