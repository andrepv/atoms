import { Component, OnInit } from '@angular/core';
import { TextStylesDBGroup } from './text-styles.model';
import { SectionViewOption } from '@core/core-types';
import textStylesSectionProviders from './text-styles-section-providers';

@Component({
  selector: 'app-text-styles-section',
  templateUrl: './text-styles-section.component.html',
  styleUrls: ['./text-styles-section.component.less'],
  providers: textStylesSectionProviders,
})
export class TextStylesSectionComponent implements OnInit {
  readonly viewOptions: SectionViewOption<TextStylesDBGroup['view']>[] = [
    {name: 'detailed'},
    {name: 'default'},
    {name: 'minimal'},
  ];

  isViewOptionsOpen = false;

  constructor() {}

  ngOnInit() {}

  toggleViewOptions() {
    this.isViewOptionsOpen = !this.isViewOptionsOpen;
  }
}
