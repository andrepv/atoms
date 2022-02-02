import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { SectionViewOption, StoreGroup } from '@core/core-types';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.less'],
})
export class GroupComponent implements OnInit {
  @Input() group: StoreGroup; 
  @Input() groupEditorTemplate: TemplateRef<any>;
  @Input() viewOptions: SectionViewOption<string>[] = [];

  @Input() customButtonsTemplate: TemplateRef<any>;

  isViewListOpen = false;

  constructor() {}

  ngOnInit() {}

  toggleViewList() {
    this.isViewListOpen = !this.isViewListOpen;
  }
}
