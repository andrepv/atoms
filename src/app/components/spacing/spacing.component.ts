import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-spacing',
  templateUrl: './spacing.component.html',
  styleUrls: ['./spacing.component.less']
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
