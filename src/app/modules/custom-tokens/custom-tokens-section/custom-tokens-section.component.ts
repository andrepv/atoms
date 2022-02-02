import { Component, OnInit } from '@angular/core';
import SectionManagerContentService from '@core/services/section-manager-content.service';
import SectionManagerGroupsService from '@core/services/section-manager-groups.service';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { browserStorageDB } from '@core/storages/browser-storage/browser-storage-db';
import CustomTokensManagerTokensService from '../custom-tokens-managers/custom-tokens-managers-tokens.service';

@Component({
  selector: 'app-custom-tokens-section',
  templateUrl: './custom-tokens-section.component.html',
  styleUrls: ['./custom-tokens-section.component.less'],
  providers: [
    {provide: 'storage', useValue: browserStorageDB.customTokens},
    SectionManagerContentService,
    SectionManagerGroupsService,
    {
      useClass: CustomTokensManagerTokensService,
      provide: SectionManagerTokensService
    },
  ]
})
export class CustomTokensSectionComponent implements OnInit {
  constructor() { }

  ngOnInit() {}
}
