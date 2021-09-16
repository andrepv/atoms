import { Component, Input, OnInit } from '@angular/core';
import { ContentManagerService } from '../../services/content-manager.service';
import { StoreService, TokenGroup } from '../../services/store.service';

@Component({
  selector: 'app-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.less']
})
export class GroupHeaderComponent implements OnInit {
  @Input() group: TokenGroup;
  @Input() contentManager: ContentManagerService<any, any>;
  
  constructor(public store: StoreService) {}

  ngOnInit() {}

  onBlur(value: string) {
    if (!value.length || value === this.group.name) {
      return;
    }
    this.contentManager.renameGroup(value, this.group.id)
  }
}
