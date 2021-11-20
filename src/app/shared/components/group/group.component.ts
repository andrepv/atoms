import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { StoreGroup } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.less'],
})
export class GroupComponent implements OnInit {
  @Input() group: StoreGroup; 
  @Input() tokenPreviewTemplate: TemplateRef<any>;
  @Input() tokenTemplate: TemplateRef<any> | false = false;

  isEditable: boolean;

  constructor(private section: SectionContentManagerService,) {
    this.isEditable = section.sectionViewConfigs.isGroupEditable;
  }

  ngOnInit() {}

  addToken() {
    const token = this.section.createToken(this.group.id);
    this.section.addToken(token, this.group.id);
  }
}
