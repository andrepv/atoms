import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EditorService } from '@core/services/editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements OnInit {

  constructor(public editor: EditorService) {}

  ngOnInit() {}
}
