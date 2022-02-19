import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CacheToken } from '@core/core-types';
import { TypefaceDBToken } from '../typeface-section/typeface.model';

@Component({
  selector: 'app-typeface-list-select',
  templateUrl: './typeface-list-select.component.html',
  styleUrls: ['./typeface-list-select.component.less']
})
export class TypefaceListSelectComponent implements OnInit {
  @Input() typefaceId: number;
  @Output() change: EventEmitter<CacheToken<TypefaceDBToken>> = new EventEmitter();

  constructor() { }

  ngOnInit() {}
}
