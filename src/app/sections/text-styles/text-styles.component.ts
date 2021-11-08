import { Component, OnInit } from '@angular/core';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';

@Component({
  selector: 'app-text-styles',
  templateUrl: './text-styles.component.html',
  styleUrls: ['./text-styles.component.less'],
  providers: [
    {provide: 'tables', useValue: db.textStyles},
    ContentManagerService
  ]
})
export class TextStylesComponent implements OnInit {
  constructor(private contentManager: ContentManagerService) {}

  ngOnInit() {
    this.contentManager.configure({
      contentManagerConfigs: {
        getDefaultTokenValue: () => ({}),
      }
    })
  }
}
