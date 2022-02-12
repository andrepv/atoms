import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExportFormat } from '@core/types/export-types';

@Component({
  selector: 'app-input-file-name',
  templateUrl: './input-file-name.component.html',
  styleUrls: ['./input-file-name.component.less']
})
export class InputFileNameComponent implements OnInit {
  @Input() fileName: string;
  @Input() format: ExportFormat;
  @Output() saveFileName: EventEmitter<string> = new EventEmitter();

  _fileName = "";

  constructor() {}

  ngOnInit() {
    this._fileName = this.fileName;
  }

  save() {
    const replacement = "_";
    const illegalRe = /[\/\?<>\\:\*\|"]/g;
    const controlRe = /[\x00-\x1f\x80-\x9f]/g;
    const reservedRe = /^\.+$/;
    const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
    const windowsTrailingRe = /[\. ]+$/;

    const input = this._fileName
    .replace(illegalRe, replacement)
    .replace(controlRe, replacement)
    .replace(reservedRe, replacement)
    .replace(windowsReservedRe, replacement)
    .replace(windowsTrailingRe, replacement)
    .trim();

    if (input !== this.fileName) {
      this.saveFileName.emit(input);
    }

    this._fileName = input

  }

}
