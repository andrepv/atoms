import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonPlayState } from '../button-play/button-play.component';

@Component({
  selector: 'app-motion-token',
  templateUrl: './motion-token.component.html',
  styleUrls: ['./motion-token.component.less'],
  animations: [
    trigger('run', [
      state('pause', style({width: '0%'})),
      state('play', style({width: '100%'})),
      transition('* <=> *', [animate('{{ duration }}ms 0.5s')])
    ])
  ]
})
export class MotionTokenComponent implements OnInit {
  @Input() duration: number;
  @Input() isEditable = false;

  @Input() set isActive(value: false) {
    if (!value && this._isActive) {
      this.pause();
      return;
    }

    if (value && !this._isActive) {
      this.play();
    }
  }

  _isActive = false;

  animationState: ButtonPlayState = 'pause';

  constructor() {}

  ngOnInit() {}

  onDone() {
    if (this._isActive) {
      this.animationState = this.animationState === 'play' ? 'pause' : 'play';
    }
  }

  play() {
    this._isActive = true;
    this.animationState = 'play';
  }

  pause() {
    this._isActive = false;
    this.animationState = 'pause';
  }
}
