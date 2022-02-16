import { Component, OnInit } from '@angular/core';
import { SectionManagerCachedContentService  } from '@core/services/section-manager-cached-content.service';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.less'],
})
export class TypographyComponent implements OnInit {
  readonly PAGE_NAME = "Typography";

  constructor(public cache: SectionManagerCachedContentService) {}

  ngOnInit() {
    this.cache.addPage({
      name: this.PAGE_NAME,
      content: {
        "Type Face": [],
        "Text Styles": [],
      }
    });
  }
}
