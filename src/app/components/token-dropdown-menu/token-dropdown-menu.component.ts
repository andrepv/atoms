import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-token-dropdown-menu',
  templateUrl: './token-dropdown-menu.component.html',
  styleUrls: ['./token-dropdown-menu.component.less']
})
export class TokenDropdownMenuComponent implements OnInit {
  @Output() rename: EventEmitter<void> = new EventEmitter();
  @Output() delete: EventEmitter<void> = new EventEmitter();
  @Output() copy: EventEmitter<void> = new EventEmitter();

  constructor(public store: StoreService) {}

  ngOnInit() {}
}
