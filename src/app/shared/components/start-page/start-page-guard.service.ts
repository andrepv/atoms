import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ThemeManagerService } from '@core/services/theme-manager.service';

@Injectable({
  providedIn: 'root',
})
export class StartPageGuardService implements CanActivate {
  constructor(private themeManager: ThemeManagerService) {}

  canActivate() {
    return !Boolean(this.themeManager.list.length)
  }
}
