import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { StoreGroup } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { ThemeManagerService } from '@core/services/theme-manager.service';
import { ExplorerService } from '../../../layout/explorer/explorer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.less']
})
export class GroupListComponent implements OnInit {
  @Input() groupTemplate: TemplateRef<any>;
  @Input() sectionTreeTemplate: TemplateRef<any>;
  @Input() isLoading = false;

  @ViewChild("treeTemplate") treeTemplateRef: TemplateRef<any>

  groupList: StoreGroup[] = [];
  subscription: Subscription;

  constructor(
    public cm: SectionContentManagerService,
    private theme: ThemeManagerService,
    private explorer: ExplorerService,
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
    await this.cm.load();
    this.groupList = this.cm.getGroupList();
    this.explorer.addSection(this.cm.sectionName, this.treeTemplateRef)
  }
}
