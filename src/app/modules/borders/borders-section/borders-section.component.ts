import { Component, OnInit } from '@angular/core';
import { StoreToken } from '@core/core-types';
import SectionManagerContentService from '@core/services/section-manager-content.service';
import SectionManagerGroupsService from '@core/services/section-manager-groups.service';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { browserStorageDB } from '@core/storages/browser-storage/browser-storage-db';
import BordersManagerTokensService from '../borders-managers/borders-manager-tokens.service';
import { BorderDBToken } from '../borders.model';

@Component({
  selector: 'app-borders-section',
  templateUrl: './borders-section.component.html',
  styleUrls: ['./borders-section.component.less'],
  providers: [
    {provide: 'storage', useValue: browserStorageDB.border},
    {useClass: BordersManagerTokensService, provide: SectionManagerTokensService},
    SectionManagerContentService,
    SectionManagerGroupsService,
  ]
})
export class BordersSectionComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  getBorder(token: StoreToken<BorderDBToken>) {
    const {width, style, color} = token;
    return `${width}px ${style} ${color}`;
  }
}
