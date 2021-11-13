import { Component, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { db } from '@core/indexedDB';

@Component({
  selector: 'app-spacing-editor',
  template: `<app-modular-scale-editor></app-modular-scale-editor>`,
  styleUrls: ['./spacing-editor.component.less'],
  providers: [
    {provide: 'tables', useValue: db.spacing},
    SectionContentManagerService,
  ]
})
export class SpacingEditorComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
