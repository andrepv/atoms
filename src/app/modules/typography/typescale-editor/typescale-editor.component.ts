import { Component, OnInit } from '@angular/core';
import { EditorService } from '@core/services/editor.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { db } from '@core/indexedDB';
import { TypescaleTokenModel, TypescaleGroupModel } from '@typography/typescale/typescale.model';

@Component({
  selector: 'app-typescale-editor',
  templateUrl: './typescale-editor.component.html',
  styleUrls: ['./typescale-editor.component.less'],
  providers: [
    {provide: 'tables', useValue: db.typescale},
    SectionContentManagerService,
  ]
})
export class TypescaleEditorComponent implements OnInit {
  get textPreviewId() {
    return this.editor.content.group.state.textPreviewId;
  }

  constructor(
    private editor: EditorService<TypescaleTokenModel, TypescaleGroupModel>,
    private section: SectionContentManagerService<TypescaleTokenModel, TypescaleGroupModel>,
  ) {}

  ngOnInit() {}

  setTextStyles(textPreviewId: number) {
    this.section.setGroupState(
      this.editor.content.group.id,
      {textPreviewId}
    );
  }
}
