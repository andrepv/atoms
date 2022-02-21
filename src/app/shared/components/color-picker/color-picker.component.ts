import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorPaletteDBToken } from '@colors/color-palette-section/color-palette.model';
import { TokensByTheme } from '@core/core-types';
import SectionManagerContentService from '@core/services/section-manager-content.service';
import SectionManagerGroupsService from '@core/services/section-manager-groups.service';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { ThemeManagerService } from '@core/services/theme-manager.service';
import { browserStorageDB } from '@core/storages/browser-storage/browser-storage-db';
import { StorageGroup } from '@core/storages/storages-types';
import chroma from 'chroma-js';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.less'],
  providers: [
    {provide: 'storage', useValue: browserStorageDB.colorPalette},
    SectionManagerContentService,
    SectionManagerTokensService,
    SectionManagerGroupsService,
  ]
})
export class ColorPickerComponent implements OnInit {
  @Input() color: string;
  @Input() colorChangeDelay = 500;
  @Input() mode: 'light' | 'dark' | 'normal' = 'normal';

  @Output() colorSave: EventEmitter<string> = new EventEmitter();
  @Output() colorChange: EventEmitter<string> = new EventEmitter();

  isPopoverVisible = false;
  colorsByTheme: TokensByTheme<ColorPaletteDBToken> = [];
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
    private themeManager: ThemeManagerService,
    private colors: SectionManagerTokensService<ColorPaletteDBToken, StorageGroup>,
  ) {}

  async ngOnInit() {
    this.colorChange$.pipe(
      takeUntil(this.destroy$),
      debounceTime(this.colorChangeDelay),
      distinctUntilChanged(),
      tap(color => this.colorSave.emit(color)),
    ).subscribe();

    await this.setThemeColors();

    await this.setAllThemesColors();
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
      this.setThemeColors();
    }
  }

  private async setThemeColors() {
    this.currentThemeColors = await this.colors.load();
  }

  private async setAllThemesColors() {
    const colors = await this.colors.storage.loadList();

    for (let theme of this.themeManager.list) {
      if (theme.id !== this.themeManager.selected.id) {
        const themeTokens = colors.filter(color => color.themeId === theme.id);
        if (themeTokens.length) {
          this.colorsByTheme.push({
            themeName: theme.name,
            tokens: themeTokens
          })
        }
      }
    }
  }
}
