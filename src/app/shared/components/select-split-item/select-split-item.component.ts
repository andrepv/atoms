import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-split-item',
  template: '<div [class]="classes"><ng-content></ng-content></div>',
  styleUrls: ['./select-split-item.component.less']
})
export class SelectSplitItemComponent implements OnInit {
  @Input() role: 'button' | '' = '';
  @Input() position: 'start' | 'end' | '' = '';

  get classes() {
    return {
      'item': true,
      'btn': this.role === 'button',
      'first': this.position === 'start',
      'last': this.position === 'end'
    }
  }

  constructor() {}

  ngOnInit() {}
}
