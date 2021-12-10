import { Component, Input, OnInit } from '@angular/core';
import { StoreGroup } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { TypescaleTokenModel, TypescaleGroupModel } from '@typography/typescale-section/typescale.model';

@Component({
  selector: 'app-typescale-editor',
  templateUrl: './typescale-editor.component.html',
  styleUrls: ['./typescale-editor.component.less'],
})
export class TypescaleEditorComponent implements OnInit {
  @Input() group: any;

  get textPreviewId() {
    return this.group.textPreviewId;
  }

  constructor(private section: SectionContentManagerService<TypescaleTokenModel, TypescaleGroupModel>) {}

  ngOnInit() {}

  setTextStyles(textPreviewId: number) {
    this.section.updateGroup(this.group, {textPreviewId})
    // this.section.setGroupState(this.group, {textPreviewId});
  }
}
