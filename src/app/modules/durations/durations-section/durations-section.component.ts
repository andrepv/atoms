import { Component, OnInit } from '@angular/core';
import { StoreToken } from '@core/core-types';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { DurationsDBGroup, DurationsDBToken } from '../durations.model';
import durationsSectionProviders from './durations-section-providers';

@Component({
  selector: 'app-durations-section',
  templateUrl: './durations-section.component.html',
  styleUrls: ['./durations-section.component.less'],
  providers: durationsSectionProviders
})
export class DurationsSectionComponent implements OnInit {
  constructor(private tokens: SectionManagerTokensService<DurationsDBToken, DurationsDBGroup>) {}

  ngOnInit() {}

  setTokenValue(value: DurationsDBToken['modularScaleTokenValue'], token: StoreToken) {
    this.tokens.update(token, {modularScaleTokenValue: value});
  }
}
