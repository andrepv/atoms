import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-colors',
  template: `
  <div>
    <h1 class="page-title">{{ PAGE_NAME }}</h1>
    <div></div>
  </div>
  `,
  styles: [`
    .page-title {
      margin-bottom: 14px;
    }
  `],
})
export class ColorsComponent implements OnInit {
  readonly PAGE_NAME = "Colors";

  constructor(public store: StoreService) {}

  ngOnInit() {
    this.store.setSection(this.PAGE_NAME, {
      "Palette": [],
      "Gradients": [],
    })
  }
}
