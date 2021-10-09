import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TypefaceTokenTable } from '../../../services/db.service';
import { FontManagerService } from '../font-manager.service';
import { GoogleFont } from '../google-fonts/google-fonts.component';
import { LoadedFontsManager } from './loaded-fonts-manager';

@Component({
  selector: 'app-loaded-fonts',
  templateUrl: './loaded-fonts.component.html',
  styleUrls: ['./loaded-fonts.component.less']
})
export class LoadedFontsComponent implements OnInit {
  @Output() save: EventEmitter<GoogleFont> = new EventEmitter();
  @Input() tokenTable: TypefaceTokenTable;

  get fonts() {
    return Object.entries(this.fontsManager.fonts).map(
      ([themeName, fonts]) => (
        {theme: themeName, fonts: Object.values(fonts)}
      )
    )
  }

  private fontsManager: LoadedFontsManager;

  constructor(fontManager: FontManagerService) {
    this.fontsManager = fontManager.loadedFonts;
  }

  ngOnInit() {
    const loadTokens = () => this.tokenTable.toArray();
    this.fontsManager.loadFonts(loadTokens)
  }
}
