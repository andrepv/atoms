import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ThemeManagerService } from '@core/services/theme-manager.service';
import { browserStorageDB } from '@core/storages/browser-storage/browser-storage-db';
import { StorageGroup, StorageToken } from '@core/storages/storages-types';
import { getPrebuiltTheme } from './get-prebuilt-theme';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.less']
})
export class StartPageComponent implements OnInit {
  themeName = "theme";
  radioValue: "empty" | "prebuilt" = "prebuilt";
  isLoading = false;

  constructor(
    private themes: ThemeManagerService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (this.themes.list.length) {
      this.router.navigate(['']);
    }
  }

  async addTheme() {
    try {
      this.isLoading = true;
      const theme = await this.themes.add(this.themeName);

      if (this.radioValue !== "empty") {
        await this.fillTheme(theme.id);
      }

      const exportConfigs = await browserStorageDB.exportConfigs.loadList();

      if (!exportConfigs.length) {
        await browserStorageDB.exportConfigs.table.add({
          excludedSections: [],
          fileName: "design-tokens",
          format: "css",
          id: 1,
          name: "My export",
          prefix: "",
          showComments: true,
        }, 1);
      }

      this.router.navigate(['']);
    } finally {
      this.isLoading = false;
    }
  }

  async fillTheme(themeId: number) {
    const theme = getPrebuiltTheme(themeId)

    for (let tables of browserStorageDB.sections) {
      const sectionName = tables?.sectionName;
      const groups: StorageGroup[] = theme[sectionName]?.groups;
      const tokens: StorageToken[] = theme[sectionName]?.tokens;

      if (groups) {
        for (let group of groups) {
          await tables.groups.table.add(group, group.id);
        }

        if (tokens) {
          for (let token of tokens) {
            await tables.tokens.table.add(token, token.id);
          }
        }
      }
    }
  }
}
