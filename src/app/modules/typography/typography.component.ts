import { Component, OnInit } from '@angular/core';
import { StoreService } from '@core/services/store.service';
import { TextPreviewService } from './text-preview/text-preview.service';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.less'],
})
export class TypographyComponent implements OnInit {
  readonly PAGE_NAME = "Typography";

  constructor(
    public store: StoreService,
    private preview: TextPreviewService
  ) {}

  ngOnInit() {
    this.store.setPageStructure({
      name: this.PAGE_NAME,
      content: {
        "Type Face": [],
        "Type Scale": [],
        "Line Height": [],
        "Letter Spacing": [],
        "Text Styles": [],
      }
    });
  }

  ngOnDestroy() {
    this.preview.onDestroy();
  }
}
