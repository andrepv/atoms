import { Component, Input, OnInit } from '@angular/core';
import { ContentManagerService } from '../../services/content-manager.service';

@Component({
  selector: 'app-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.less']
})
export class GroupHeaderComponent implements OnInit {
  @Input() name: string;
  @Input() id: number;
  @Input() contentManager: ContentManagerService<any, any>;
  
  constructor() {}

  ngOnInit() {}

  onBlur(value: string) {
    if (!value.length || value === this.name) {
      return;
    }
    this.contentManager.renameGroup(value, this.id)
  }
}
