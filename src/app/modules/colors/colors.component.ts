import { Component, OnInit } from '@angular/core';
import { StoreService } from '@core/services/store.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.less'],
})
export class ColorsComponent implements OnInit {
  readonly PAGE_NAME = "Colors";

  constructor(public store: StoreService) {}

  ngOnInit() {
    this.store.setPageStructure({
      name: this.PAGE_NAME,
      content: {
        "Palette": [],
        "Gradients": [],
      }
    })
  }
}
