import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit {
  @Input() title: string = '';
  @Input() min: number = 0
  @Input() max: number = 10;
  @Input() model: number

  @Output() modelChange: EventEmitter<number> = new EventEmitter();
  @Output() afterModelChange: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onInputChange() {
    this.modelChange.emit(this.model);
    this.afterModelChange.emit(this.model);
  }

}
