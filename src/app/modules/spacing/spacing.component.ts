import { Component, OnInit } from '@angular/core';
import { StoreService } from '@core/services/store.service';

@Component({
  selector: 'app-spacing',
  templateUrl: './spacing.component.html',
  styleUrls: ['./spacing.component.less'],
})
export class SpacingComponent implements OnInit {
  readonly PAGE_NAME = "Spacing";

  constructor(public store: StoreService) {}

  ngOnInit(): void {
    this.store.setPageStructure({
      name: this.PAGE_NAME,
      content: {
        "Spacing": [],
      }
    });
  }

}
