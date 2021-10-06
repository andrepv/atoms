import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-spacing',
  template: `
    <div id="font-primary">
      Block 1
    </div>

    <div id="font-secondary">
      Block 2
    </div>
  `,
})
export class SpacingComponent implements OnInit {

  constructor(public store: StoreService) { }

  ngOnInit(): void {
    this.store.section = {
      name: "Spacing",
      content: [
        {name: "Groups", content: []},
      ]
    }
  }

}
