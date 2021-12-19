import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBGroup, DBToken } from '@core/core.model';
import { db } from '@core/indexedDB';
import { ThemeManagerService } from '@core/services/theme-manager.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.less']
})
export class StartPageComponent implements OnInit {
  themeName = "";
  radioValue: "empty" | "prebuilt" = "empty";
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

      this.router.navigate(['']);
    } finally {
      this.isLoading = false;
    }
  }

  async fillTheme(themeId: number) {
    const data = {
      "Borders": {
        groups: [
          {name: 'borders',themeId, id: 1}
        ],
        tokens: [
          {id: 1, groupId: 1, name: 'border-1', themeId, color: "#000", width: 4, style: "solid"},
          {id: 2, groupId: 1, name: 'border-2', themeId, color: "#fff", width: 8, style: "dotted",}
      ],
      },
      "Custom Tokens": {
        groups: [
          {name: 'z-index', themeId, id: 1},
          {name: 'opacity', themeId, id: 2},
        ],
        tokens: [
          {id: 1, name: 'z-index-1', groupId: 1, themeId, value: '1'},
          {id: 2, name: 'z-index-2', groupId: 1, themeId, value: '2'},
          {id: 3, name: 'opacity-0', groupId: 2, themeId, value: '0'},
          {id: 4, name: 'opacity-1', groupId: 2, themeId, value: '1'},
        ],
      },
      "Spacing": {
        groups: [
          {id: 1, name: 'spacing', themeId, scale: {scaleRatio: 1.067, base: 16}}
        ],
        tokens: [
          {id: 1, groupId: 1, name: 'spacing-10', themeId, value: 14.054},
          {id: 2, groupId: 1, name: 'spacing-20', themeId, value: 14.995},
          {id: 3, groupId: 1, name: 'spacing-base', themeId, value: 16},
        ],
      },
      "Durations": {
        groups: [
          {id: 1, name: 'group', themeId, scale: {scaleRatio: 1.125, base: 140}}
        ],
        tokens: [
          {id: 1, groupId: 1, name: 'durations-10', themeId, value: 110.617},
          {id: 2, groupId: 1, name: 'durations-20', themeId, value: 124.444},
          {id: 3, groupId: 1, name: 'durations-base', themeId, value: 140},
        ],
      },
      "Box Shadow": {
        groups: [{id: 1, name: 'group', themeId}],
        tokens: [{
          id: 1,
          groupId: 1,
          name: 'box-shadow-1',
          themeId,
          backgroundColor: '#ffffff',
          blockColor: '#2d2d2d',
          layers: [{
            blur: "12px",
            color: "#2e475a",
            inset: "",
            offsetX: "17px",
            offsetY: "17px",
            spread: "2px",
          }]
        }],
      },
      "Color Palette": {
        groups: [{id: 1, name: 'primary-color', themeId}],
        tokens: [
          {
            id: 1,
            name: "primary-color",
            color: "#9038ce",
            isPrimary: true,
            groupId: 1,
            themeId,
            shadeConfigs: {mixRatio: 63, saturation: 1},
            tintConfigs: {saturation: 1, mixRatio: 63},
          },
          {
            id: 2,
            color: "#b579de",
            groupId: 1,
            isPrimary: false,
            name: "primary-color-100",
            primaryColorId: 1,
            themeId,
            type: "tint"
          },
          {
            id: 3,
            color: "#d6b5ed",
            groupId: 1,
            isPrimary: false,
            name: "primary-color-50", 
            primaryColorId: 1,
            themeId,
            type: "tint"
          },
          {
            id: 4,
            color: "#61268a",
            groupId: 1,
            isPrimary: false,
            name: "primary-color-200",
            primaryColorId: 1,
            themeId,
            type: "shade"
          },
          {
            id: 5,
            color: "#35154c",
            groupId: 1,
            isPrimary: false,
            name: "primary-color-300",
            primaryColorId: 1,
            themeId,
            type: "shade"
          },
        ],
      },
      "Type Face": {
        groups: [
          {name: 'group', themeId, id: 1},
        ],
        tokens: [{
          id: 1,
          category: "display",
          data: "",
          family: "Poiret One",
          groupId: 1,
          name: "token-yu7CIUSwqf",
          subsets: ['cyrillic', 'latin', 'latin-ext'],
          themeId,
          type: "google-fonts",
          variants: ['regular'],
        }]
      }
    }

    for (let tables of db.sections) {
      const groups: DBGroup[] = data[tables.name]?.groups;
      const tokens: DBToken[] = data[tables.name]?.tokens;

      if (groups) {
        for (let group of groups) {
          await tables.groupTable.add(group, group.id);
        }

        if (tokens) {
          for (let token of tokens) {
            await tables.tokenTable.add(token, token.id);
          }
        }
      }
    }
  }
}
