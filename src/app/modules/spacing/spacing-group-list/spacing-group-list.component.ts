import { Component, OnInit } from '@angular/core';
import { DEFAULT_BASE } from '@shared/components/modular-scale-editor/modular-scale-editor.component';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { db } from '@core/indexedDB';
import { getScaleValue } from '@utils';
import { SpacingGroupModel, SpacingTokenModel } from '@spacing/spacing.model';
import { ClipboardService } from '@core/services/clipboard.service';

@Component({
  selector: 'app-spacing-group-list',
  templateUrl: './spacing-group-list.component.html',
  styleUrls: ['./spacing-group-list.component.less'],
  providers: [
    {provide: 'tables', useValue: db.spacing},
    SectionContentManagerService,
    ClipboardService,
  ]
})
export class SpacingGroupListComponent implements OnInit {
  readonly MIN_VALUE = 1;
  readonly MAX_VALUE = 150;

  get sectionName() {
    return this.section.sectionName;
  }

  constructor(public section: SectionContentManagerService<SpacingTokenModel, SpacingGroupModel>) {}

  ngOnInit() {
    this.section.configure({
      contentManagerConfigs: {
        getDefaultTokenValue: groupId => this.getDefaultTokenValue(groupId),
        getDefaultGroupState: () => ({scale: false})
      },
      sectionViewConfigs: {
        isTokenEditable: false,
        isGroupEditable: true,
      }
    })
  }

  private getDefaultTokenValue(groupId: number) {
    const group = this.section.getGroup(groupId);
    if (group.state.scale) {
      return getScaleValue(group.tokens.length, group.state.scale);
    }
    return DEFAULT_BASE;
  }

}
