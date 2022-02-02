import { Component, OnInit } from '@angular/core';
import { StoreToken } from '@core/core-types';
import SectionManagerContentService from '@core/services/section-manager-content.service';
import SectionManagerGroupsService from '@core/services/section-manager-groups.service';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { browserStorageDB } from '@core/storages/browser-storage/browser-storage-db';
import BoxShadowManagerTokensService from '@shadows/box-shadow-managers/box-shadow-manager-tokens.service';
import { BoxShadowDBToken } from './box-shadow-section.model';

@Component({
  selector: 'app-box-shadow-section',
  templateUrl: './box-shadow-section.component.html',
  styleUrls: ['./box-shadow-section.component.less'],
  providers: [
    {provide: 'storage', useValue: browserStorageDB.boxShadow},
    {
      useClass: BoxShadowManagerTokensService,
      provide: SectionManagerTokensService
    },
    SectionManagerContentService,
    SectionManagerGroupsService,
  ]
})
export class BoxShadowSectionComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  getBoxShadow(token: StoreToken<BoxShadowDBToken>) {
    return token.layers.reduce((accumulator, layers, index) => {
      let values = Object.values(layers);
      if (!values[values.length - 1]) values.pop();
      let comma = index + 1 !== token.layers.length ? ',' : '';
      accumulator += values.join(' ');
      return accumulator + comma
    }, "")
  }

  getBlockStyle(token: StoreToken<BoxShadowDBToken>) {
    return {
      backgroundColor: token.blockColor,
      boxShadow: this.getBoxShadow(token),
    }
  }
}
