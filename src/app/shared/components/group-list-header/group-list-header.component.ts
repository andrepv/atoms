import { Component, OnInit } from '@angular/core';
import { ClipboardService } from '@core/services/clipboard.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { StoreService } from '@core/services/store.service';

@Component({
  selector: 'app-group-list-header',
  templateUrl: './group-list-header.component.html',
  styleUrls: ['./group-list-header.component.less']
})
export class GroupListHeaderComponent implements OnInit {
  sectionName: string;

  constructor(
    private section: SectionContentManagerService,
    private clipboard: ClipboardService,
    private store: StoreService
  ) {}

  ngOnInit() {
    this.sectionName = this.section.sectionName;
  }

  addGroup() {
    const group = this.section.createGroup();
    this.section.addGroup(group);
  }

  pastGroup() {
    this.clipboard.pastGroup();
  }

  canUseClipboard() {
    return this.store.canUseClipboard
  }
}
