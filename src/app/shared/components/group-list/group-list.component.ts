import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CacheGroup } from '@core/core-types';
import { ThemeManagerService } from '@core/services/theme-manager.service';
import { ExplorerService } from '../../../layout/explorer/explorer.service';
import { Subscription } from 'rxjs';
import SectionManagerGroupsService from '@core/services/section-manager-groups.service';
import SectionManagerContentService from '@core/services/section-manager-content.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.less']
})
export class GroupListComponent implements OnInit {
  @Input() groupTemplate: TemplateRef<any>;
  @Input() sectionTreeTemplate: TemplateRef<any>;
  @Input() isLoading = false;
  @Input() codePreviewTemplate: TemplateRef<any>;

  @ViewChild("treeTemplate") treeTemplateRef: TemplateRef<any>

  groupList: CacheGroup[] = [];
  subscription: Subscription;

  isCodeViewModeActive = false;

  constructor(
    private theme: ThemeManagerService,
    private explorer: ExplorerService,
    private groupsManager: SectionManagerGroupsService,
    public section: SectionManagerContentService,
  ) {
    this.subscription = this.theme.selected$.subscribe(() => this.load())
  }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private async load() {
    await this.section.load();
    this.groupList = this.groupsManager.getList();
    this.explorer.addSection(this.section.name, this.treeTemplateRef)
  }

  toggleCodeViewMode() {
    this.isCodeViewModeActive = !this.isCodeViewModeActive;
  }
}
