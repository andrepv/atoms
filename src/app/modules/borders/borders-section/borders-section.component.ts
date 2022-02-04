import { Component, OnInit } from '@angular/core';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import bordersSectionProviders from './borders-section-providers';

@Component({
  selector: 'app-borders-section',
  templateUrl: './borders-section.component.html',
  styleUrls: ['./borders-section.component.less'],
  providers: bordersSectionProviders,
})
export class BordersSectionComponent implements OnInit {
  constructor(public tokens: SectionManagerTokensService) {}

  ngOnInit() {}
}
