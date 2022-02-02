import { Component, Input, OnInit } from '@angular/core';
import { StoreGroup } from '@core/core-types';
import { ButtonPlayState } from '../button-play/button-play.component';

@Component({
  selector: 'app-motion-group',
  templateUrl: './motion-group.component.html',
  styleUrls: ['./motion-group.component.less']
})
export class MotionGroupComponent implements OnInit {
  @Input() group: StoreGroup;
  state: ButtonPlayState = 'pause';

  get isActive() {
    return this.state === 'play';
  }

  constructor() { }

  ngOnInit() {}

  play() {
    this.state = 'play';
  }

  pause() {
    this.state = 'pause';
  }

}
