import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.less']
})
export class GroupListComponent implements OnInit {
  @Input() groupTemplate: TemplateRef<any>;

  get groupList() {
    return this.cm.getGroupList();
  }

  constructor(public cm: SectionContentManagerService) {}

  ngOnInit() {
    this.cm.load();
  }

  ngOnDestroy() {
    this.cm.subscription.unsubscribe();
  }
}
