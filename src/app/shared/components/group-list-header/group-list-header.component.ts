import { Component, OnInit } from '@angular/core';
import { ClipboardService } from '@core/services/clipboard.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';

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
  ) {}

  ngOnInit() {
    this.sectionName = this.section.sectionName;
  }

  addGroup() {
    const group = {
      ...this.section.createGroup(),
      ...this.section.hooks.getDefaultGroup()
    }

    this.section.addGroup(group);
  }

  pastGroup() {
    this.clipboard.pastGroup();
  }

  canUseClipboard() {
    return this.clipboard.isAvailable
  }
}
