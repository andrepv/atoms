import { Component, OnInit } from '@angular/core';
import { StoreService } from '@core/services/store.service';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.less'],
})
export class TypographyComponent implements OnInit {
  readonly PAGE_NAME = "Typography";

  constructor(public store: StoreService) {}

  ngOnInit() {
    this.store.setSection(this.PAGE_NAME, {
      "Type Face": [],
      "Type Scale": [],
      "Line Height": [],
      "Letter Spacing": [],
      "Text Styles": [],
    })
  }
}
