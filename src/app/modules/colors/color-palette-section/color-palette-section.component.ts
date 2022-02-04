import { Component, OnInit } from '@angular/core';
import { SectionViewOption } from '@core/core-types';
import { ColorPaletteDBGroup } from './color-palette.model';
import colorPaletteSectionProviders from './color-palette-section-providers';

@Component({
  selector: 'app-color-palette-section',
  templateUrl: './color-palette-section.component.html',
  styleUrls: ['./color-palette-section.component.less'],
  providers: colorPaletteSectionProviders,
})
export class ColorPaletteSectionComponent implements OnInit {
  readonly viewOptions: SectionViewOption<ColorPaletteDBGroup['view']>[] = [
    {name: 'grouped'},
    {name: 'default'},
    {name: 'inline'},
  ];

  isViewOptionsOpen = false;

  constructor() {}

  ngOnInit() {}

  toggleViewOptions() {
    this.isViewOptionsOpen = !this.isViewOptionsOpen;
  }
}
