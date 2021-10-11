import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Token, TokenGroup } from '../../../services/store.service';

@Component({
  selector: 'app-typescale-token',
  templateUrl: './typescale-token.component.html',
  styleUrls: ['./typescale-token.component.less']
})
export class TypescaleTokenComponent implements OnInit {
  @Input() token: Token;
  @Input() group: TokenGroup;
  @Output() onAfterChange: EventEmitter<number> = new EventEmitter();

  value = 0;

  constructor() {}
  
  ngOnInit() {
    this.value = parseInt(this.token.value);
  }

}
