import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.less']
})
export class ColorPickerComponent implements OnInit {
  @Input() color: string;
  @Input() colorChangeDelay = 500;

  @Output() colorSave: EventEmitter<string> = new EventEmitter();
  @Output() colorChange: EventEmitter<string> = new EventEmitter();

  private colorChange$ = new Subject<string>();
  private destroy$ = new Subject();

  constructor() {}

  ngOnInit() {
    this.colorChange$.pipe(
      takeUntil(this.destroy$),
      debounceTime(this.colorChangeDelay),
      distinctUntilChanged(),
      tap(color => this.colorSave.emit(color)),
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onColorPickerChange(color: string) {
    this.colorChange.emit(color);
    this.colorChange$.next(color);
  }
}
