import { Component, OnInit } from '@angular/core';
import { SectionManagerCachedContentService  } from '@core/services/section-manager-cached-content.service';

@Component({
  selector: 'app-borders',
  templateUrl: './borders.component.html',
  styleUrls: ['./borders.component.less']
})
export class BordersComponent implements OnInit {
  readonly PAGE_NAME = "Borders";

  constructor(private cache: SectionManagerCachedContentService) {}

  ngOnInit() {
    this.cache.addPage({
      name: this.PAGE_NAME,
      content: {
        "Borders": [],
        "Border Radius": [],
      }
    });
  }
}
