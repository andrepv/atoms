import { Component, OnInit } from '@angular/core';
import { StoreService } from '@core/services/store.service';

@Component({
  selector: 'app-shadows',
  templateUrl: './shadows.component.html',
  styleUrls: ['./shadows.component.less']
})
export class ShadowsComponent implements OnInit {
  readonly PAGE_NAME = "Shadows";

  constructor(public store: StoreService) {}

  ngOnInit() {
    this.store.setPageStructure({
      name: this.PAGE_NAME,
      content: {
        "Box-Shadow": [],
      }
    })
  }
}
