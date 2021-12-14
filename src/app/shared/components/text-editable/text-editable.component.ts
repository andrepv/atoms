import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-text-editable',
  templateUrl: './text-editable.component.html',
  styleUrls: ['./text-editable.component.less']
})
export class TextEditableComponent implements OnInit {
  @Input() text = "";
  @Input() makeUneditableOnBlur = true;
  @Input() type: "input" | "textarea" = "input"
  @Output() blur: EventEmitter<string> = new EventEmitter();
  
  inputValue = this.text;
  isEditable = false;
  isLoading = false;

  constructor() {}
 
  ngOnInit() {}

  makeEditable() {
    this.isEditable = true;
    this.inputValue = this.text;
  }

  makeUneditable() {
    this.isEditable = false;
  }

  onBlur() {
    const inputValue = this.inputValue.trim();
    if (inputValue.length && inputValue !== this.text) {
      this.blur.emit(inputValue);

      if (this.makeUneditableOnBlur) {
        this.makeUneditable();
      }
    } else {
      this.makeUneditable();
    }
  }
}
