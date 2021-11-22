import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { StoreGroup } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { ThemeManagerService } from '@core/services/theme-manager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.less']
})
export class GroupListComponent implements OnInit, OnDestroy {
  @Input() groupTemplate: TemplateRef<any>;
  @Input() isLoading = false;
  groupList: StoreGroup[] = [];
  subscription: Subscription;

  constructor(
    public cm: SectionContentManagerService,
    private theme: ThemeManagerService,
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
  }
}
