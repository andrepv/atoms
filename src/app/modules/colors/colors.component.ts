import { Component, OnInit } from '@angular/core';
import { SectionManagerCachedContentService  } from '@core/services/section-manager-cached-content.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.less'],
})
export class ColorsComponent implements OnInit {
  readonly PAGE_NAME = "Colors";

  constructor(public cache: SectionManagerCachedContentService ) {}

  ngOnInit() {
    this.cache.addPage({
      name: this.PAGE_NAME,
      content: {
        "Color Palette": [],
      }
    })
  }
}
