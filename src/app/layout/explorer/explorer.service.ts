import { Injectable, TemplateRef } from '@angular/core';
import { SectionNames } from '@core/core.model';
import { StoreService } from '@core/services/store.service';
import { ThemeManagerService } from '@core/services/theme-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {
  isLoading = true;
  templates = [];

  private sectionTreeTemplates: {
    [sectionName: string]: TemplateRef<any>
  } = {}

  constructor(
    private store: StoreService,
    private themeManager: ThemeManagerService
  ) {
    this.themeManager.selected$.subscribe(() => {
      this.onPageDestroy();
      this.onPageInit();
    })
  }

  addSection(
    sectionName: SectionNames,
    sectionTreeTemplate: TemplateRef<any>
  ) {
    const sectionCount = Object.keys(this.store.page.content).length;

    this.sectionTreeTemplates[sectionName] = sectionTreeTemplate;
    
    if (sectionCount) {
      const isPageLoaded = !Object.values(this.sectionTreeTemplates).includes(null);

      if (isPageLoaded) {
        this.isLoading = false;
        this.templates = Object.values(this.sectionTreeTemplates)
      }
    }
  }

  onPageInit() {
    for (let section in this.store.page.content) {
      this.sectionTreeTemplates[section] = null;
    }
  }

  onPageDestroy() {
    this.sectionTreeTemplates = {};
    this.templates = [];
    this.isLoading = true;
  }
}
