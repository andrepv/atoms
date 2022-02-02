import { Component, OnInit } from '@angular/core';
import { StoreToken } from '@core/core-types';
import SectionManagerContentService from '@core/services/section-manager-content.service';
import SectionManagerGroupsService from '@core/services/section-manager-groups.service';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { browserStorageDB } from '@core/storages/browser-storage/browser-storage-db';
import { StorageGroup } from '@core/storages/storages-types';
import BorderRadiusManagerTokensService from '../border-radius-managers/border-radius-manager-tokens.service';
import { BorderRadiusDBToken } from './border-radius.model';

@Component({
  selector: 'app-border-radius-section',
  templateUrl: './border-radius-section.component.html',
  styleUrls: ['./border-radius-section.component.less'],
  providers: [
    {provide: 'storage', useValue: browserStorageDB.borderRadius},
    SectionManagerContentService,
    SectionManagerGroupsService,
    {
      useClass: BorderRadiusManagerTokensService,
      provide: SectionManagerTokensService
    },
  ]
})
export class BorderRadiusSectionComponent implements OnInit {
  constructor(private tokens: SectionManagerTokensService<BorderRadiusDBToken, StorageGroup>) {}

  ngOnInit() {}

  setTokenValue(
    radius: BorderRadiusDBToken['radius'],
    token: StoreToken<BorderRadiusDBToken>,
  ) {
    this.tokens.update(token, {radius});
  }
}
