import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor-card',
  templateUrl: './editor-card.component.html',
  styleUrls: ['./editor-card.component.less']
})
export class EditorCardComponent implements OnInit {
  @Input() hasBody = true;

  constructor() {}

  ngOnInit() {}
}
