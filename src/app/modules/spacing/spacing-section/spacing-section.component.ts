import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { getScaleValue } from '@utils';
import { SpacingGroupModel, SpacingTokenModel, SPACING_DB_DATA } from '@spacing/spacing.model';
import { provideSectionDeps } from '@utils/provide-section-deps';
import { DEFAULT_SCALE_BASE } from '@shared/components/modular-scale-editor/modular-scale-editor.model';
import { StoreToken, StoreGroup } from '@core/core.model';

@Component({
  selector: 'app-spacing-section',
  templateUrl: './spacing-section.component.html',
  styleUrls: ['./spacing-section.component.less'],
  providers: [...provideSectionDeps(SPACING_DB_DATA.tableGroupName)]
})
export class SpacingSectionComponent implements OnInit {
  readonly MIN_VALUE = 1;
  readonly MAX_VALUE = 150;

  get sectionName() {
    return this.section.sectionName;
  }

  constructor(private section: SectionContentManagerService) {}

  ngOnInit() {
    this.section.configure({
      hooks: {
        getDefaultToken: groupId => ({
          value: this.getDefaultTokenValue(groupId)
        }),
        getDefaultGroup: () => ({
          scale: false
        })
      },
    })
  }

  private getDefaultTokenValue(groupId: number) {
    const group: any = this.section.getGroup(groupId);
    if (group.scale) {
      return getScaleValue(group.tokens.length, group.scale);
    }
    return DEFAULT_SCALE_BASE;
  }

  setTokenValue(value: number, token: StoreToken, group: StoreGroup) {
    this.section.updateToken(token, group, {value});
  }
}
