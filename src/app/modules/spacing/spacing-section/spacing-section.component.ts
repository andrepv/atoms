import { Component, OnInit } from '@angular/core';
import { SpacingDBGroup, SpacingDBToken } from '@spacing/spacing.model';
import { StoreToken } from '@core/core-types';
import { browserStorageDB } from '@core/storages/browser-storage/browser-storage-db';
import ModularScaleManagerTokensService from '@shared/components/modular-scale-managers/modular-scale-manager-tokens.service';
import SectionManagerContentService from '@core/services/section-manager-content.service';
import ModularScaleManagerGroupsService from '@shared/components/modular-scale-managers/modular-scale-manager-groups.service';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import SectionManagerGroupsService from '@core/services/section-manager-groups.service';

@Component({
  selector: 'app-spacing-section',
  templateUrl: './spacing-section.component.html',
  styleUrls: ['./spacing-section.component.less'],
  providers: [
    {provide: 'storage', useValue: browserStorageDB.spacing},
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
export class SpacingSectionComponent implements OnInit {
  constructor(private tokens: SectionManagerTokensService<SpacingDBToken, SpacingDBGroup>) {}

  ngOnInit() {}

  setTokenValue(value: SpacingDBToken['modularScaleTokenValue'], token: StoreToken) {
    this.tokens.update(token, {modularScaleTokenValue: value});
  }
}
