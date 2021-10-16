import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-typography',
  template: `
  <div>
    <h1 class="page-title">{{ PAGE_NAME }}</h1>
    <div>
      <app-typeface></app-typeface>
      <app-typescale></app-typescale>
      <app-line-height></app-line-height>
      <app-letter-spacing></app-letter-spacing>
    </div>
  </div>
  `,
  styles: [`
    .page-title {
      margin-bottom: 14px;
    }
  `],
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
    })
  }
}
