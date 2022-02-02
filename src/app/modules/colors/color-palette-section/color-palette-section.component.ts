import { Component, OnInit } from '@angular/core';
import { browserStorageDB } from '@core/storages/browser-storage/browser-storage-db';
import SectionManagerContentService from '@core/services/section-manager-content.service';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { ColorPaletteContentService } from '@colors/color-palette-managers/color-palette-manager-content';
import ColorPaletteManagerTokensService from '@colors/color-palette-managers/color-palette-manager-tokens';
import SectionManagerGroupsService from '@core/services/section-manager-groups.service';
import { SectionViewOption } from '@core/core-types';
import { ColorPaletteDBGroup } from './color-palette.model';
import ColorPaletteManagerGroupsService from '@colors/color-palette-managers/color-palette-manager-groups';

@Component({
  selector: 'app-color-palette-section',
  templateUrl: './color-palette-section.component.html',
  styleUrls: ['./color-palette-section.component.less'],
  providers: [
    {provide: 'storage', useValue: browserStorageDB.colorPalette},
    {
      provide: SectionManagerGroupsService,
      useClass: ColorPaletteManagerGroupsService
    },
    {
      provide: SectionManagerContentService,
      useClass: ColorPaletteContentService,
    },
    {
      provide: SectionManagerTokensService,
      useClass: ColorPaletteManagerTokensService,
    },
  ]
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
