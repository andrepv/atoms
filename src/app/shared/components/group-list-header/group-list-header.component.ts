import { Component, OnInit } from '@angular/core';
import { ContentManagerService } from '@core/services/content-manager.service';
import { StoreService } from '@core/services/store.service';

@Component({
  selector: 'app-group-list-header',
  templateUrl: './group-list-header.component.html',
  styleUrls: ['./group-list-header.component.less']
})
export class GroupListHeaderComponent implements OnInit {
  sectionName: string;

  constructor(
    private contentManager: ContentManagerService,
    private store: StoreService
  ) {}

  ngOnInit() {
    this.sectionName = this.contentManager.sectionName;
  }

  addGroup() {
    const group = this.contentManager.createGroup();
    this.contentManager.addGroup(group);
  }

  pastGroup() {
    this.contentManager.clipboard.pastGroup();
  }

  canUseClipboard() {
    return this.store.isClipboardActionsAvailable
  }
}
