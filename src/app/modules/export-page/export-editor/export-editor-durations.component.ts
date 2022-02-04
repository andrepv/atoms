import { Component, OnInit } from '@angular/core';
import durationsSectionProviders from '../../durations/durations-section/durations-section-providers';
import { ExportEditorSectionService } from '../export-editor-section/export-editor-section.service';

@Component({
  selector: 'app-export-editor-durations',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: [
    ...durationsSectionProviders,
    ExportEditorSectionService,
  ]
})
export class ExportEditorDurationsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
