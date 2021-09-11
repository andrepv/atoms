import { Component, OnInit } from '@angular/core';
import { StoreService } from './services/store.service';
import { ThemeManagerService } from './services/theme-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  theme = "";
  title = 'ui-theme-builder';
  isLoading = false;

  constructor(private store: StoreService) {}
  
  async ngOnInit() {
    this.isLoading = true;

    try {
      await this.store.loadTheme();
    } finally {
      this.isLoading = false
    }
  }
}
