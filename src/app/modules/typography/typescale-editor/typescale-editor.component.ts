import { Component, OnInit } from '@angular/core';
import { EditorService } from '@core/services/editor.service';
import { ContentManagerService } from '@core/services/content-manager.service';
import { db } from '@core/indexedDB';

@Component({
  selector: 'app-typescale-editor',
  templateUrl: './typescale-editor.component.html',
  styleUrls: ['./typescale-editor.component.less'],
  providers: [
    {provide: 'tables', useValue: db.typescale},
    ContentManagerService,
  ]
})
export class TypescaleEditorComponent implements OnInit {
  get editableGroup() {
    return this.editor.content.group;
  }

  constructor(
    public editor: EditorService,
    public contentManager: ContentManagerService,
  ) {}

  ngOnInit() {}
}
