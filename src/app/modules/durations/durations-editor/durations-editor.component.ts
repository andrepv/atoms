import { Component, OnInit } from '@angular/core';
import { provideSectionDeps } from '@utils/provide-section-deps';
import { DURATIONS_DB_DATA } from '../durations.model';

@Component({
  selector: 'app-durations-editor',
  templateUrl: './durations-editor.component.html',
  styleUrls: ['./durations-editor.component.less'],
  providers: [...provideSectionDeps(DURATIONS_DB_DATA.tableGroupName)]
})
export class DurationsEditorComponent implements OnInit {

  constructor() {}

  ngOnInit() {}

}
