import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-token-editable',
  templateUrl: './token-editable.component.html',
  styleUrls: ['./token-editable.component.less']
})
export class TokenEditableComponent implements OnInit {
  @Input() isEditable = true;
  @Input() step = 1;
  @Input() minValue = 1;
  @Input() maxValue = 100;
  @Input() value: number;
  @Output() onAfterChange: EventEmitter<number> = new EventEmitter();
  @Input() previewTemplate: TemplateRef<any>;

  _value = 0;

  constructor() {}

  ngOnInit() {
    this._value = this.value;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value) {
      this._value = changes.value.currentValue;
    }
  }
}
