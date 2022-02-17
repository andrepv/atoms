import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SectionContentEditorService } from '@core/services/section-content-editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
})
export class EditorComponent implements OnInit {

  constructor(public editor: SectionContentEditorService) {}

  ngOnInit() {}
}
