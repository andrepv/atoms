import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorPaletteTokenModel, COLORPALETTE_DB_DATA } from '@colors/color-palette/color-palette.model';
import { DBGroup, StoreToken } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { provideEditorDeps } from '@utils/provide-editor-deps';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.less'],
  providers: [...provideEditorDeps(COLORPALETTE_DB_DATA.tableGroupName)]
})
export class ColorPickerComponent implements OnInit {
  @Input() color: string;
  @Input() colorChangeDelay = 500;

  @Output() colorSave: EventEmitter<string> = new EventEmitter();
  @Output() colorChange: EventEmitter<string> = new EventEmitter();

  isPopoverVisible = false;
  presetColors: StoreToken<ColorPaletteTokenModel>[] = [];

  private colorChange$ = new Subject<string>();
  private destroy$ = new Subject();

  constructor(private colorPalettes: SectionContentManagerService<ColorPaletteTokenModel, DBGroup>) {}

  async ngOnInit() {
    this.colorChange$.pipe(
      takeUntil(this.destroy$),
      debounceTime(this.colorChangeDelay),
      distinctUntilChanged(),
      tap(color => this.colorSave.emit(color)),
    ).subscribe();

    this.presetColors = await this.colorPalettes.loadTokens();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onColorPickerChange(color: string) {
    this.colorChange.emit(color);
    this.colorChange$.next(color);
  }

  onPresetColorSelect(color: string) {
    this.colorChange.emit(color);
    this.colorSave.emit(color);
  }

  togglePopoverVisibility() {
    this.isPopoverVisible = !this.isPopoverVisible;
  }

  getColorsByIds(ids: number[]) {
    return this.presetColors.filter(({id}) => ids.includes(id)).reverse()
  }
}
