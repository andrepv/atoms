import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ContentManagerService } from '../../services/content-manager.service';
import { TokenGroup } from '../../services/store.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.less']
})
export class GroupComponent implements OnInit {
  @Input() group: TokenGroup; 
  @Input() tokenPreviewTemplate: TemplateRef<any>;
  @Input() tokenTemplate: TemplateRef<any> | false = false;

  isEditable: boolean;

  constructor(private contentManager: ContentManagerService,) {
    this.isEditable = contentManager.sectionViewConfigs.isGroupEditable;
  }

  ngOnInit() {}

  addToken() {
    const token = this.contentManager.createToken(this.group.id);
    this.contentManager.addToken(token, this.group.id);
  }
}
