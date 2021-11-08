import { Component, OnInit } from '@angular/core';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';
import { TextStylesService } from '../text-styles/text-styles.service';

@Component({
  selector: 'app-letter-spacing',
  templateUrl: './letter-spacing.component.html',
  providers: [
    {provide: 'tables', useValue: db.letterSpacing},
    ContentManagerService,
  ]
})
export class LetterSpacingComponent implements OnInit {
  get sectionName() {
    return this.contentManager.sectionName;
  }

  constructor(
    public contentManager: ContentManagerService,
    public textPreview: TextStylesService,
  ) {}

  ngOnInit() {
    this.contentManager.configure({
      contentManagerConfigs: {
        getDefaultTokenValue: () => 0.01,
        getDefaultGroupState: () => ({textPreviewId: 0})
      },
      sectionViewConfigs: {
        isTokenEditable: false,
        isGroupEditable: true,
      }
    })
  }
}
