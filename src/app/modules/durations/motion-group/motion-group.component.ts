import { Component, Input, OnInit } from '@angular/core';
import { CacheGroup } from '@core/core-types';
import { ButtonPlayState } from '../button-play/button-play.component';
import DurationManagerTokensService from '../duration-managers/duration-managers-manager-tokens.service';

@Component({
  selector: 'app-motion-group',
  templateUrl: './motion-group.component.html',
  styleUrls: ['./motion-group.component.less']
})
export class MotionGroupComponent implements OnInit {
  @Input() group: CacheGroup;
  state: ButtonPlayState = 'pause';

  get isActive() {
    return this.state === 'play';
  }

  constructor(public tokens: DurationManagerTokensService) {}

  ngOnInit() {}

  play() {
    this.state = 'play';
  }

  pause() {
    this.state = 'pause';
  }

  addHigh(group: any) {
    this.tokens.addHigh(group);
  }

  addLow(group: any) {
    this.tokens.addLow(group);
  }
}
