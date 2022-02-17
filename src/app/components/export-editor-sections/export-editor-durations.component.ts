import { Component, OnInit } from '@angular/core';
import durationsSectionProviders from '@durations/durations-section/durations-section-providers';

@Component({
  selector: 'app-export-editor-durations',
  template: '<app-export-editor-section></app-export-editor-section>',
  providers: durationsSectionProviders
})
export class ExportEditorDurationsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
