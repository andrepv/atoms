import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeManagerService } from '@core/services/theme-manager.service';
import { queryClipboardPermission } from '@utils/query-clipboard-permission';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  theme = "";
  title = 'ui-theme-builder';
  isLoading = false;

  constructor(
    private themeManager: ThemeManagerService,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.isLoading = true;

    queryClipboardPermission();

    try {
      await this.themeManager.loadList();
      if (!this.themeManager.list.length) {
        await this.router.navigate(['start-page']);
      }
    } finally {
      this.isLoading = false
    }
  }
}
