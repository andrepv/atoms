import { Component, OnInit } from '@angular/core';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { ExportEditorService } from '../../../layout/export-editor/export-editor.service';
import bordersSectionProviders from './borders-section-providers';

@Component({
  selector: 'app-borders-section',
  templateUrl: './borders-section.component.html',
  styleUrls: ['./borders-section.component.less'],
  providers: [...bordersSectionProviders, ExportEditorService]
})
export class BordersSectionComponent implements OnInit {
  constructor(public tokens: SectionManagerTokensService) {}

  ngOnInit() {}
}
