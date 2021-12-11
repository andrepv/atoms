import { Component, Input, OnInit } from '@angular/core';
import { StoreGroup } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { TypescaleDBToken, TypescaleDBGroup } from '@typography/typescale-section/typescale.model';

@Component({
  selector: 'app-typescale-editor',
  templateUrl: './typescale-editor.component.html',
  styleUrls: ['./typescale-editor.component.less'],
})
export class TypescaleEditorComponent implements OnInit {
  @Input() group: StoreGroup<TypescaleDBGroup, TypescaleDBToken>;

  get textPreviewId() {
    return this.group.textPreviewId;
  }

  constructor(private section: SectionContentManagerService<TypescaleDBToken, TypescaleDBGroup>) {}

  ngOnInit() {}

  setTextStyles(textPreviewId: number) {
    this.section.updateGroup(this.group, {textPreviewId})
  }
}
