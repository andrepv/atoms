import { Component, OnInit } from '@angular/core';
import { SectionManagerCachedContentService  } from '@core/services/section-manager-cached-content.service';

@Component({
  selector: 'app-shadows',
  templateUrl: './shadows.component.html',
  styleUrls: ['./shadows.component.less']
})
export class ShadowsComponent implements OnInit {
  readonly PAGE_NAME = "Shadows";

  constructor(public cache: SectionManagerCachedContentService) {}

  ngOnInit() {
    this.cache.addPage({
      name: this.PAGE_NAME,
      content: {
        "Box Shadow": [],
      }
    })
  }
}
