import { Component, OnInit } from '@angular/core';
import { StoreToken } from '@core/core-types';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { StorageGroup } from '@core/storages/storages-types';
import borderRadiusSectionProviders from './border-radius-section-providers';
import { BorderRadiusDBToken } from './border-radius.model';

@Component({
  selector: 'app-border-radius-section',
  templateUrl: './border-radius-section.component.html',
  styleUrls: ['./border-radius-section.component.less'],
  providers: borderRadiusSectionProviders,
})
export class BorderRadiusSectionComponent implements OnInit {
  constructor(public tokens: SectionManagerTokensService<BorderRadiusDBToken, StorageGroup>) {}

  ngOnInit() {}

  setTokenValue(
    radius: BorderRadiusDBToken['radius'],
    token: StoreToken<BorderRadiusDBToken>,
  ) {
    this.tokens.update(token, {radius});
  }
}
