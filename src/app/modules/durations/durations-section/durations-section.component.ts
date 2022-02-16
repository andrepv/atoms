import { Component, OnInit } from '@angular/core';
import { CacheToken } from '@core/core-types';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { ExportEditorService } from '../../../layout/export-editor/export-editor.service';
import { DurationsDBGroup, DurationsDBToken } from '../durations.model';
import durationsSectionProviders from './durations-section-providers';

@Component({
  selector: 'app-durations-section',
  templateUrl: './durations-section.component.html',
  styleUrls: ['./durations-section.component.less'],
  providers: [...durationsSectionProviders, ExportEditorService]
})
export class DurationsSectionComponent implements OnInit {
  constructor(private tokens: SectionManagerTokensService<DurationsDBToken, DurationsDBGroup>) {}

  ngOnInit() {}

  setTokenValue(value: DurationsDBToken['modularScaleTokenValue'], token: CacheToken) {
    this.tokens.update(token, {modularScaleTokenValue: value});
  }
}
