import { Component, OnInit } from '@angular/core';
import { SpacingDBGroup, SpacingDBToken } from '@spacing/spacing.model';
import { StoreToken } from '@core/core-types';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import spacingSectionProviders from './spacing-section-providers';
import { ExportEditorService } from '../../../layout/export-editor/export-editor.service';

@Component({
  selector: 'app-spacing-section',
  templateUrl: './spacing-section.component.html',
  styleUrls: ['./spacing-section.component.less'],
  providers: [...spacingSectionProviders, ExportEditorService]
})
export class SpacingSectionComponent implements OnInit {
  constructor(public tokens: SectionManagerTokensService<SpacingDBToken, SpacingDBGroup>) {}

  ngOnInit() {}

  setTokenValue(value: SpacingDBToken['modularScaleTokenValue'], token: StoreToken) {
    this.tokens.update(token, {modularScaleTokenValue: value});
  }
}
