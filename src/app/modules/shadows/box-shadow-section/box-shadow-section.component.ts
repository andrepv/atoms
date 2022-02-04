import { Component, OnInit } from '@angular/core';
import { StoreToken } from '@core/core-types';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import boxShadowSectionProviders from './box-shadow-section-providers';
import { BoxShadowDBToken } from './box-shadow-section.model';

@Component({
  selector: 'app-box-shadow-section',
  templateUrl: './box-shadow-section.component.html',
  styleUrls: ['./box-shadow-section.component.less'],
  providers: boxShadowSectionProviders,
})
export class BoxShadowSectionComponent implements OnInit {
  constructor(private tokens: SectionManagerTokensService) {}

  ngOnInit() {}

  getBlockStyle(token: StoreToken<BoxShadowDBToken>) {
    return {
      backgroundColor: token.blockColor,
      boxShadow: this.tokens.getStyleValue(token),
    }
  }
}
