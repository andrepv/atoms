import { Component, OnInit } from '@angular/core';
import { StoreToken } from '@core/core-types';
import SectionManagerContentService from '@core/services/section-manager-content.service';
import SectionManagerGroupsService from '@core/services/section-manager-groups.service';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { browserStorageDB } from '@core/storages/browser-storage/browser-storage-db';
import ModularScaleManagerGroupsService from '@shared/components/modular-scale-managers/modular-scale-manager-groups.service';
import ModularScaleManagerTokensService from '@shared/components/modular-scale-managers/modular-scale-manager-tokens.service';
import { DurationsDBGroup, DurationsDBToken } from '../durations.model';

@Component({
  selector: 'app-durations-section',
  templateUrl: './durations-section.component.html',
  styleUrls: ['./durations-section.component.less'],
  providers: [
    {provide: 'storage', useValue: browserStorageDB.durations},
    SectionManagerContentService,
    {
      useClass: ModularScaleManagerTokensService,
      provide: SectionManagerTokensService
    },
    {
      useClass: ModularScaleManagerGroupsService,
      provide: SectionManagerGroupsService
    },
  ]
})
export class DurationsSectionComponent implements OnInit {
  constructor(private tokens: SectionManagerTokensService<DurationsDBToken, DurationsDBGroup>) {}

  ngOnInit() {}

  setTokenValue(value: DurationsDBToken['modularScaleTokenValue'], token: StoreToken) {
    this.tokens.update(token, {modularScaleTokenValue: value});
  }
}
