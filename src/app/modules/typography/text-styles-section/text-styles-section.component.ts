import { Component, OnInit } from '@angular/core';
import { TextStylesDBGroup } from './text-styles.model';
import { SectionViewOption } from '@core/core-types';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import SectionManagerGroupsService from '@core/services/section-manager-groups.service';
import { browserStorageDB } from '@core/storages/browser-storage/browser-storage-db';
import SectionManagerContentService from '@core/services/section-manager-content.service';
import TextStylesManagerTokensService from '@typography/text-styles-managers/text-styles-manager-tokens.service';
import TextStylesManagerGroupsService from '@typography/text-styles-managers/text-styles-manager-groups.service';

@Component({
  selector: 'app-text-styles-section',
  templateUrl: './text-styles-section.component.html',
  styleUrls: ['./text-styles-section.component.less'],
  providers: [
    {provide: 'storage', useValue: browserStorageDB.textStyles},
    SectionManagerContentService,
    {
      useClass: TextStylesManagerTokensService,
      provide: SectionManagerTokensService
    },
    {
      useClass: TextStylesManagerGroupsService,
      provide: SectionManagerGroupsService
    },
  ]
})
export class TextStylesSectionComponent implements OnInit {
  readonly viewOptions: SectionViewOption<TextStylesDBGroup['view']>[] = [
    {name: 'detailed'},
    {name: 'default'},
    {name: 'minimal'},
  ];

  isViewOptionsOpen = false;

  constructor() {}

  ngOnInit() {}

  toggleViewOptions() {
    this.isViewOptionsOpen = !this.isViewOptionsOpen;
  }
}
