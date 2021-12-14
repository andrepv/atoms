import { Component, OnInit } from '@angular/core';
import { StoreService } from '@core/services/store.service';

@Component({
  selector: 'app-custom-tokens',
  templateUrl: './custom-tokens.component.html',
  styleUrls: ['./custom-tokens.component.less']
})
export class CustomTokensComponent implements OnInit {
  readonly PAGE_NAME = "Custom Tokens";

  constructor(private store: StoreService) {}

  ngOnInit() {
    this.store.setPageStructure({
      name: this.PAGE_NAME,
      content: {
        "Custom Tokens": [],
      }
    });
  }

}
