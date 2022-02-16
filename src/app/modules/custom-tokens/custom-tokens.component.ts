import { Component, OnInit } from '@angular/core';
import { SectionManagerCachedContentService  } from '@core/services/section-manager-cached-content.service';

@Component({
  selector: 'app-custom-tokens',
  templateUrl: './custom-tokens.component.html',
  styleUrls: ['./custom-tokens.component.less']
})
export class CustomTokensComponent implements OnInit {
  readonly PAGE_NAME = "Custom Tokens";

  constructor(private cache: SectionManagerCachedContentService) {}

  ngOnInit() {
    this.cache.addPage({
      name: this.PAGE_NAME,
      content: {
        "Custom Tokens": [],
      }
    });
  }

}
