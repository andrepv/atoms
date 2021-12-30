import { Injectable } from '@angular/core';
import { DBToken } from '@core/core.model';
import { BehaviorSubject } from 'rxjs';
import { standardFormatters } from '../export-code-formatter/standard-formatters';
import { CodePreviewConfigs } from '../export-types';

@Injectable()
export class ExportEditorSectionService {
  codePreviewConfigs$ = new BehaviorSubject<null | CodePreviewConfigs>(null);

  set codePreviewConfigs(value: CodePreviewConfigs) {
    this.codePreviewConfigs$.next(value);
  }

  get codePreviewConfigs() {
    return this.codePreviewConfigs$.getValue();
  }

  constructor() {}

  getTokenValue: (token: DBToken) => string | Promise<any> = () => '';

  codeFormatters = standardFormatters;
}
