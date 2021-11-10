import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ContentManagerService } from '@core/services/content-manager.service';
import { StoreService } from '@core/services/store.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.less']
})
export class GroupListComponent implements OnInit {
  @Input() groupTemplate: TemplateRef<any>;

  get groupList() {
    return this.store.getGroupList(this.contentManager.sectionName);
  }

  constructor(
    public contentManager: ContentManagerService,
    private store: StoreService
  ) {}

  ngOnInit() {
    this.contentManager.load();
  }

  ngOnDestroy() {
    this.contentManager.subscription.unsubscribe();
  }
}
