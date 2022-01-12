import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ColorPaletteDBToken, COLORPALETTE_DB_DATA } from '@colors/color-palette-section/color-palette.model';
import { DBGroup, TokensByTheme } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { ThemeManagerService } from '@core/services/theme-manager.service';
import { provideSectionDeps } from '@utils/provide-section-deps';
import chroma from 'chroma-js';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.less'],
  providers: [...provideSectionDeps(COLORPALETTE_DB_DATA.tableGroupName)],
  encapsulation: ViewEncapsulation.None,
})
export class ColorPickerComponent implements OnInit {
  @Input() color: string;
  @Input() colorChangeDelay = 500;

  @Output() colorSave: EventEmitter<string> = new EventEmitter();
  @Output() colorChange: EventEmitter<string> = new EventEmitter();

  isPopoverVisible = false;
  colorsByTheme: TokensByTheme<ColorPaletteDBToken>;
  currentThemeColors: ColorPaletteDBToken[] = null;

  private colorChange$ = new Subject<string>();
  private destroy$ = new Subject();

  view: 'list' | 'grid' = 'list';

  allThemes = false;

  radioValue: 'color-picker' | 'presets' = 'color-picker';

  getColor() {
    return chroma(this.color).hex();
  }

  constructor(
    private colorPalettes: SectionContentManagerService<ColorPaletteDBToken, DBGroup>,
    private themeManager: ThemeManagerService,
  ) {}

  async ngOnInit() {
    this.colorChange$.pipe(
      takeUntil(this.destroy$),
      debounceTime(this.colorChangeDelay),
      distinctUntilChanged(),
      tap(color => this.colorSave.emit(color)),
    ).subscribe();

    this.currentThemeColors = await this.colorPalettes.tables.getThemeTokens(this.themeManager.selected.id);

    this.colorsByTheme = await this.colorPalettes.tables.getTokens([this.themeManager.selected.id]);
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
    this.color = color;
    this.colorChange.emit(color);
    this.colorChange$.next(color);
  }

  async togglePopover() {
    this.isPopoverVisible = !this.isPopoverVisible;

    if (this.isPopoverVisible) {
      this.currentThemeColors = await this.colorPalettes.tables.getThemeTokens(this.themeManager.selected.id);
    }
  }
}
