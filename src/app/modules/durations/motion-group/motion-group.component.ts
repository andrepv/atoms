import { Component, Input, OnInit } from '@angular/core';
import SectionManagerTokensService from '@app/core/services/section-manager-tokens.service';
import { CacheGroup } from '@core/core-types';
import { ButtonPlayState } from '../button-play/button-play.component';

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

  constructor(public tokens: SectionManagerTokensService) { }

  ngOnInit() {}

  play() {
    this.state = 'play';
  }

  pause() {
    this.state = 'pause';
  }

}
