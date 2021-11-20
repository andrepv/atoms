import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { StoreGroup } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.less']
})
export class GroupListComponent implements OnInit {
  @Input() groupTemplate: TemplateRef<any>;
  groupList: StoreGroup[] = [];

  constructor(public cm: SectionContentManagerService) {}

  async ngOnInit() {
    await this.cm.load();
    this.groupList = this.cm.getGroupList();
  }

  ngOnDestroy() {
    this.cm.subscription.unsubscribe();
  }
}
