import { Component, OnInit } from '@angular/core';
import { StoreService } from '@core/services/store.service';
import { ThemeManagerService } from '@core/services/theme-manager.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TextPreviewService } from './text-preview/text-preview.service';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.less'],
})
export class TypographyComponent implements OnInit {
  readonly PAGE_NAME = "Typography";
  private destroy$ = new Subject();

  constructor(
    public store: StoreService,
    private preview: TextPreviewService,
    private themeManager: ThemeManagerService,
  ) {}

  ngOnInit() {
    this.store.setPageStructure({
      name: this.PAGE_NAME,
      content: {
        "Type Face": [],
        "Type Scale": [],
        "Line Height": [],
        "Letter Spacing": [],
        "Text Styles": [],
      }
    });

    this.themeManager.selected$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.preview.resetState();
    })
  }

  ngOnDestroy() {
    this.preview.resetState();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
