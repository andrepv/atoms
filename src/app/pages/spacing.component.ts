import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-spacing',
  template: `
    <div>
      <h1 class="page-title">{{ PAGE_NAME }}</h1>
      <div>
        <app-spacing-groups></app-spacing-groups>
      </div>
    </div>
  `,
  styles: [`
    .page-title {
      margin-bottom: 14px;
    }
  `],
})
export class SpacingComponent implements OnInit {
  readonly PAGE_NAME = "Spacing";

  constructor(public store: StoreService) {}

  ngOnInit(): void {
    this.store.setSection(this.PAGE_NAME, {
      "Spacing": [],
    })
  }

}
