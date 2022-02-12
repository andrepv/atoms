import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import SectionManagerContentService from '@core/services/section-manager-content.service';
import SectionManagerGroupsService from '@core/services/section-manager-groups.service';
import { ClipboardService } from '@core/services/clipboard.service';
import { SectionNames } from '@core/core-types';

@Component({
  selector: 'app-group-list-header',
  templateUrl: './group-list-header.component.html',
  styleUrls: ['./group-list-header.component.less']
})
export class GroupListHeaderComponent implements OnInit {
  @Input() isCodeViewActive = false;
  @Output() toggleCodeViewMode: EventEmitter<void> = new EventEmitter();

  sectionName: SectionNames;

  constructor(
    private clipboard: ClipboardService,
    private groups: SectionManagerGroupsService,
    private section: SectionManagerContentService,
  ) {}

  ngOnInit() {
    this.sectionName = this.section.name;
  }

  addGroup() {
    this.groups.add();
  }

  pastGroup() {
    this.groups.past();
  }

  canUseClipboard() {
    return this.clipboard.isAvailable
  }
}
