import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export type ButtonPlayState = 'pause' | 'play';

@Component({
  selector: 'app-button-play',
  templateUrl: './button-play.component.html',
  styleUrls: ['./button-play.component.less']
})
export class ButtonPlayComponent implements OnInit {
  @Input() state: ButtonPlayState = 'pause';
  @Output() play: EventEmitter<Event> = new EventEmitter();
  @Output() pause: EventEmitter<Event> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onPlay(event: Event) {
    event.stopPropagation();
    this.play.emit(event);
  }

  onPause(event: Event) {
    event.stopPropagation();
    this.pause.emit(event)
  }
}
