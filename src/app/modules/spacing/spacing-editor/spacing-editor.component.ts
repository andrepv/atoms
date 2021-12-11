import { Component, Input, OnInit } from '@angular/core';
import { StoreGroup } from '@core/core.model';
import { SpacingDBGroup } from '@spacing/spacing.model';

@Component({
  selector: 'app-spacing-editor',
  templateUrl: './spacing-editor.component.html',
  styleUrls: ['./spacing-editor.component.less'],
})
export class SpacingEditorComponent implements OnInit {
  @Input() group: StoreGroup<SpacingDBGroup>

  constructor() {}
  ngOnInit() {}
}
