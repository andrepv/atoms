import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SectionNames, StoreService } from '../../services/store.service';

@Component({
  selector: 'app-section-tokens-select',
  template: `
    <div>
      <span>{{ section }}</span>
      <nz-select
        [ngModel]="selectedTokenId"
        (ngModelChange)="change.emit($event)"
        [nzPlaceHolder]="placeholder"
      >
        <nz-option
          *ngFor="let token of tokens"
          [nzValue]="token.id"
          [nzLabel]="token.name"
        ></nz-option>
      </nz-select>
    </div>
  `,
  styleUrls: ['./section-tokens-select.component.less']
})
export class SectionTokensSelectComponent implements OnInit {
  @Input() selectedTokenId: number;
  @Input() section: SectionNames;
  @Input() placeholder = `select ...`;
  @Output() change: EventEmitter<number> = new EventEmitter();

  get tokens() {
    return this.store.getSectionTokens(this.section)
  }

  constructor(private store: StoreService) {}

  ngOnInit() {}
}
