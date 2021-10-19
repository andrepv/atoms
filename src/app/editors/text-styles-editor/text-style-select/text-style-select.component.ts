import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { TextStyles } from '../../../services/db.service';
import { SectionNames, StoreService } from '../../../services/store.service';
import { TextStyleOption } from '../text-styles-editor.component';

const TEMPLATE_DATA = {
  "Type Face": {styleProp: 'fontFamily', placeholder: 'select font family'},
  "Type Scale": {styleProp: 'fontSize', placeholder: 'select font size'},
  "Line Height": {styleProp: 'lineHeight', placeholder: 'select line height'},
  "Letter Spacing": {styleProp: 'letterSpacing', placeholder: 'select letter spacing'},
}

@Component({
  selector: 'app-text-style-select',
  template: `
    <span>{{ section }}</span>

    <div *ngIf="options.length">
      <nz-select
        [(ngModel)]="selectedOption"
        [nzPlaceHolder]="placeholder"
        (ngModelChange)="onSelect($event)"
      >
        <nz-option
          *ngFor="let option of options"
          [nzValue]="option.id"
          [nzLabel]="option.name"
        ></nz-option>
      </nz-select>
    </div>
  `,
  styleUrls: ['./text-style-select.component.less']
})
export class TextStyleSelectComponent implements OnInit {
  @Input() section: SectionNames;
  @Input() editableTokenValue: TextStyles;
  @Output() change: EventEmitter<TextStyleOption> = new EventEmitter();

  selectedOption = null;

  get styleProp() {
    return TEMPLATE_DATA[this.section].styleProp;
  }

  get placeholder() {
    return TEMPLATE_DATA[this.section].placeholder;
  }

  get options() {
    return this.store.getSectionTokens(this.section)
  }

  constructor(private store: StoreService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.editableTokenValue) {
      const {currentValue} = changes.editableTokenValue;
      if (currentValue !== this.selectedOption) {
        this.selectedOption = this.editableTokenValue[this.styleProp] || null;
      }
    }
  }

  onSelect(value: number) {
    this.change.emit({tokenId: value, styleProp: this.styleProp})
  }
}
