import { Component, OnInit } from '@angular/core';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import typefaceSectionProviders from './typeface-section-providers';

@Component({
  selector: 'app-typeface-section',
  templateUrl: './typeface-section.component.html',
  styleUrls: ['./typeface-section.component.less'],
  providers: typefaceSectionProviders
})
export class TypefaceSectionComponent implements OnInit {
  constructor(public tokens: SectionManagerTokensService) {}

  ngOnInit() {}
}
