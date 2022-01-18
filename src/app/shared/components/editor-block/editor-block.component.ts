import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor-block',
  templateUrl: './editor-block.component.html',
  styleUrls: ['./editor-block.component.less']
})
export class EditorBlockComponent implements OnInit {
  @Input() inline = false;
  @Input() title: string;
  @Input() hasVerticalSpaces = true;
  
  constructor() {}

  ngOnInit() {}

}
