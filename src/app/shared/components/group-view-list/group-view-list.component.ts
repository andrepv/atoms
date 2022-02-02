import { Component, Input, OnInit } from '@angular/core';
import { SectionViewOption, StoreGroup } from '@core/core-types';
import SectionManagerGroupsService from '@core/services/section-manager-groups.service';

@Component({
  selector: 'app-group-view-list',
  templateUrl: './group-view-list.component.html',
  styleUrls: ['./group-view-list.component.less']
})
export class GroupViewListComponent implements OnInit {
  @Input() options: SectionViewOption<string>[] = [];
  @Input() group: StoreGroup; 

  constructor(private groups: SectionManagerGroupsService) {}

  ngOnInit() {}

  setGroupView(view: string) {
    this.groups.update(this.group, {view});
  }
}
