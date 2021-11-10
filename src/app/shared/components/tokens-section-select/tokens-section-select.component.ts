import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SectionNames, StoreService } from '@core/services/store.service';

@Component({
  selector: 'app-tokens-section-select',
  templateUrl: './tokens-section-select.component.html',
  styleUrls: ['./tokens-section-select.component.less']
})
export class TokensSectionSelectComponent implements OnInit {
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
