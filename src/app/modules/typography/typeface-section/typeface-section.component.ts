import { Component, OnInit } from '@angular/core';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import SectionManagerGroupsService from '@core/services/section-manager-groups.service';
import SectionManagerContentService from '@core/services/section-manager-content.service';
import { TypefaceManagerContentService } from '@typography/typeface-managers/typeface-manager-content.service';
import TypefaceManagerTokensService from '@typography/typeface-managers/typeface-manager-tokens.service';
import { browserStorageDB } from '@core/storages/browser-storage/browser-storage-db';

@Component({
  selector: 'app-typeface-section',
  templateUrl: './typeface-section.component.html',
  styleUrls: ['./typeface-section.component.less'],
  providers: [
    {provide: 'storage', useValue: browserStorageDB.typeface},
    SectionManagerGroupsService,
    {
      useClass: TypefaceManagerContentService,
      provide: SectionManagerContentService
    },
    {
      useClass: TypefaceManagerTokensService,
      provide: SectionManagerTokensService
    },
  ]
})
export class TypefaceSectionComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
