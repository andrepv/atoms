import { Component, Input, OnInit } from '@angular/core';
import { StoreGroup } from '@core/core.model';
import { DurationsGroupModel } from '../durations.model';

@Component({
  selector: 'app-durations-editor',
  templateUrl: './durations-editor.component.html',
  styleUrls: ['./durations-editor.component.less'],
})
export class DurationsEditorComponent implements OnInit {
  @Input() group: StoreGroup<DurationsGroupModel>;

  constructor() {}
  ngOnInit() {}
}
