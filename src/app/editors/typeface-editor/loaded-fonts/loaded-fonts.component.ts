import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ThemeTokens } from '../../../components/tokens-section-list/tokens-section-list.component';
import { GoogleFont } from '../../../sections/typeface/typeface.model';
import { FontManagerService } from '../font-manager.service';

@Component({
  selector: 'app-loaded-fonts',
  template: `
  <app-tokens-section-list
    [themeTokensTemplate]="templateRef"
    (onLoad)="onThemeFontsLoad($event)"
  >
    <ng-template #templateRef let-tokens let-themeName="themeName">
      <h5>{{ themeName }}</h5>
      <nz-list>
        <nz-list-item *ngFor="let token of tokens">
          <p [style.font-family]="token.value.family" (click)="save.emit(token.value)">
            {{ token.value.family }}
          </p>
        </nz-list-item>
      </nz-list>
    </ng-template>
  </app-tokens-section-list>
  `,
  styleUrls: ['./loaded-fonts.component.less']
})
export class LoadedFontsComponent implements OnInit {
  @Output() save: EventEmitter<GoogleFont> = new EventEmitter();

  constructor(private fontsManager: FontManagerService) {}

  ngOnInit() {}

  onThemeFontsLoad(data: ThemeTokens[]) {
    for (let themeTokens of data) {
      const fonts = Object.values(themeTokens.tokens.map(token => token.value));
			this.fontsManager.load(fonts);
		}
  }
}
