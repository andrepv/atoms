import { Component, OnInit } from '@angular/core';
import { DEFAULT_BASE } from '../../editors/modular-scale-editor/modular-scale-editor.component';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';
import { StoreService } from '../../services/store.service';
import { getScaleValue } from '../../utils/get-type-scale-value';

@Component({
  selector: 'app-spacing-groups',
  templateUrl: './spacing.component.html',
  styleUrls: ['./spacing.component.less'],
  providers: [
    {provide: 'tables', useValue: db.spacing},
    ContentManagerService,
  ]
})
export class SpacingGroupsComponent implements OnInit {
  readonly MIN_VALUE = 1;
  readonly MAX_VALUE = 150;

  get sectionName() {
    return this.contentManager.sectionName;
  }

  constructor(
    public contentManager: ContentManagerService,
    private store: StoreService,
  ) { }

  ngOnInit() {
    this.contentManager.configure({
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
    const group = this.store.getGroup(this.sectionName, groupId);
    if (group.state.scale) {  
      return getScaleValue(group.tokens.length, group.state.scale);
    }
    return DEFAULT_BASE;
  }

}
