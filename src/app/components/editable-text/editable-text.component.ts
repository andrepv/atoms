import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-editable-text',
  template: `
    <ng-container *ngIf="!isEditable">
      <ng-container *ngTemplateOutlet="customTemplate; context: {$implicit: text}"></ng-container>
    </ng-container>

    <ng-container *ngIf="isEditable">
      <input
        nz-input
        [(ngModel)]="inputValue"
        (blur)="onBlur()"
        [appAutofocus]
      />
    </ng-container>
  `,
  styleUrls: ['./editable-text.component.less']
})
export class EditableTextComponent implements OnInit {
  @Input() isEditable = false;
  @Input() text = "";
  @Input() customTemplate: TemplateRef<any>;
  @Output() blur: EventEmitter<string> = new EventEmitter();
  inputValue = this.text;

  constructor() {}
 
  ngOnInit() {}

  makeEditable() {
    this.isEditable = true;
    this.inputValue = this.text;
  }

  onBlur() {
    this.blur.emit(this.inputValue);
    this.isEditable = false;
  }
}
