import { Component, OnInit } from '@angular/core';
import { ContentManagerService } from '@core/services/content-manager.service';
import { db } from '@core/indexedDB';

@Component({
  selector: 'app-spacing-editor',
  template: `<app-modular-scale-editor></app-modular-scale-editor>`,
  styleUrls: ['./spacing-editor.component.less'],
  providers: [
    {provide: 'tables', useValue: db.spacing},
    ContentManagerService,
  ]
})
export class SpacingEditorComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
