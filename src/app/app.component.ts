import { Component, OnInit } from '@angular/core';
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

  constructor(private themes: ThemeManagerService) {}
  
  async ngOnInit() {
    this.isLoading = true;

    try {
      await this.themes.loadList();
    } finally {
      this.isLoading = false
    }
  }
}
