import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorPaletteTokenModel, COLORPALETTE_DB_DATA } from '@colors/color-palette-section/color-palette.model';
import { DBGroup, TokensByTheme } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { ThemeManagerService } from '@core/services/theme-manager.service';
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
  @Input() currentThemeColors: ColorPaletteTokenModel[] = null;

  @Output() colorSave: EventEmitter<string> = new EventEmitter();
  @Output() colorChange: EventEmitter<string> = new EventEmitter();

  isPopoverVisible = false;
  colorsByTheme: TokensByTheme<ColorPaletteTokenModel>;

  private colorChange$ = new Subject<string>();
  private destroy$ = new Subject();

  constructor(
    private colorPalettes: SectionContentManagerService<ColorPaletteTokenModel, DBGroup>,
    private themeManager: ThemeManagerService,
  ) {}

  async ngOnInit() {
    this.colorChange$.pipe(
      takeUntil(this.destroy$),
      debounceTime(this.colorChangeDelay),
      distinctUntilChanged(),
      tap(color => this.colorSave.emit(color)),
    ).subscribe();

    if (!this.currentThemeColors) {
      this.currentThemeColors = await this.colorPalettes.tables.getThemeTokens(this.themeManager.selected.id);
    }

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
    this.colorChange.emit(color);
    this.colorSave.emit(color);
  }

  togglePopover() {
    this.isPopoverVisible = !this.isPopoverVisible;
  }  
}
