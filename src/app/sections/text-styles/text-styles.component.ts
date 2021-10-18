import { Component, OnInit } from '@angular/core';
import { FontModel } from '../../editors/typeface-editor/typeface-editor.component';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';
import { StoreService, Token} from '../../services/store.service';

export const DEFAULT_TEXT_STYLES = {
  fontFamily: 'Arial',
  fontSize: 35,
  lineHeight: 1.5,
  letterSpacing: 0,
  text: 'Quick brown fox jumped over the lazy red dog'
}

@Component({
  selector: 'app-text-styles',
  template: `
    <app-groups [tokenTemplate]="tokenTemplateRef" layout="list">
      <ng-template #tokenTemplateRef let-token>
        <div class="token" [style]="getStyles(token)">
          <p>{{ token.value.text }}</p>
        </div>
      </ng-template>
    </app-groups>
  `,
  styleUrls: ['./text-styles.component.less'],
  providers: [
    {provide: 'tables', useValue: db.textStyles},
    ContentManagerService
  ]
})
export class TextStylesComponent implements OnInit {
  STYLES = {
    fontFamily: {
      get: (value: string | FontModel) => typeof value  === 'string' ? value : value.family,
      section: "Type Face"
    },
    fontSize: {
      get: (value: number) => `${value}px`,
      section: "Type Scale"
    },
    lineHeight: {
      get: (value: number) => value,
      section: "Line Height"
    },
    letterSpacing: {
      get: (value: number) => `${value}em`,
      section: "Letter Spacing"
    }
  }

  constructor(
    public contentManager: ContentManagerService,
    private store: StoreService,
  ) {}

  ngOnInit() {
    const defaultTokenValue = {};
    Object.entries(DEFAULT_TEXT_STYLES).map(([key, value]) => (
      defaultTokenValue[key] = key !== "text" ? 0 : value
    ))

    this.contentManager.configure({
      getDefaultTokenValue: () => defaultTokenValue,
    })
  }

  getStyles(token: Token) {
    const styles = {}

    for (let style in token.value) {
      const id = token.value[style];
      if (!isNaN(id)) {
        styles[style] = id === 0
          ? this.STYLES[style].get(DEFAULT_TEXT_STYLES[style])
          : this.getStyle(style, id)
      }
    }

    return styles;
  }

  private getStyle(prop: string, value: number) {
    const section = this.STYLES[prop].section;
    const tokens = this.store.getSectionTokens(section);
    const token = tokens.find(token => token.id === value);

    if (token) {
      return this.STYLES[prop].get(token.value);
    }
    return this.STYLES[prop].get(DEFAULT_TEXT_STYLES[prop]);
  }
}
