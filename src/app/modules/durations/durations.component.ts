import { Component, OnInit } from '@angular/core';
import { StoreService } from '@core/services/store.service';

@Component({
  selector: 'app-durations',
  templateUrl: './durations.component.html',
  styleUrls: ['./durations.component.less']
})
export class DurationsComponent implements OnInit {
  readonly PAGE_NAME = "Durations";

  constructor(public store: StoreService) {}

  ngOnInit(): void {
    this.store.setPageStructure({
      name: this.PAGE_NAME,
      content: {
        "Groups": [],
      }
    });
  }
}
