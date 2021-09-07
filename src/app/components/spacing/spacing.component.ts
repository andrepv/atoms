import { Component, OnInit } from '@angular/core';
import { ExplorerService } from '../explorer/explorer.service';

@Component({
  selector: 'app-spacing',
  templateUrl: './spacing.component.html',
  styleUrls: ['./spacing.component.less']
})
export class SpacingComponent implements OnInit {

  constructor(public explorer: ExplorerService) { }

  ngOnInit(): void {
    this.explorer.section = {
      name: "Spacing",
      content: [
        {name: "Groups", content: []},
      ]
    }
  }

}
