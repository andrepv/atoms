import { Component, OnInit } from '@angular/core';
import { SectionManagerCachedContentService  } from '@core/services/section-manager-cached-content.service';

@Component({
  selector: 'app-spacing',
  templateUrl: './spacing.component.html',
  styleUrls: ['./spacing.component.less'],
})
export class SpacingComponent implements OnInit {
  readonly PAGE_NAME = "Spacing";

  constructor(public cache: SectionManagerCachedContentService) {}

  ngOnInit(): void {
    this.cache.addPage({
      name: this.PAGE_NAME,
      content: {
        "Spacing": [],
      }
    });
  }

}
