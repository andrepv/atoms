import { Component, OnInit } from '@angular/core';
import { SectionManagerCachedContentService  } from '@core/services/section-manager-cached-content.service';

@Component({
  selector: 'app-durations',
  templateUrl: './durations.component.html',
  styleUrls: ['./durations.component.less']
})
export class DurationsComponent implements OnInit {
  readonly PAGE_NAME = "Durations";

  constructor(public cache: SectionManagerCachedContentService) {}

  ngOnInit(): void {
    this.cache.addPage({
      name: this.PAGE_NAME,
      content: {
        "Durations": [],
      }
    });
  }
}
