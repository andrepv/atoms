import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit {
  @Input() title: string = '';
  @Input() min: number = 0
  @Input() max: number = 10;
  @Input() step: number = 1;
  @Input() model: number;
  @Input() units: string | 'none' = 'px';
  @Input() displaySlider = true;
  @Input() displayInput = true;

  @Output() modelChange: EventEmitter<number> = new EventEmitter();
  @Output() afterModelChange: EventEmitter<number> = new EventEmitter();

  private inputChange$ = new Subject<number>();
  private destroy$ = new Subject();

  constructor() {}

  ngOnInit() {
    this.inputChange$.pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
      tap(() => {
        this.modelChange.emit(this.model);
        this.afterModelChange.emit(this.model);
      })
    ).subscribe();
  }

  onInputChange() {
    this.inputChange$.next();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
