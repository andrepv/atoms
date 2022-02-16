import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { SectionNames } from '@core/core-types';
import { SectionManagerCachedContentService  } from '@core/services/section-manager-cached-content.service';

@Component({
  selector: 'app-tokens-section-select',
  templateUrl: './tokens-section-select.component.html',
  styleUrls: ['./tokens-section-select.component.less']
})
export class TokensSectionSelectComponent implements OnInit {
  @Input() selectedTokenId: number;
  @Input() section: SectionNames;
  @Input() placeholder = `select ...`;
  @Input() customContent: TemplateRef<any>
  @Output() change: EventEmitter<number> = new EventEmitter();

  get tokens() {
    return this.cache.getSectionTokens(this.section)
  }

  constructor(private cache: SectionManagerCachedContentService) {}

  ngOnInit() {}
}
