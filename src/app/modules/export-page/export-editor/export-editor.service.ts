import { Injectable } from '@angular/core';
import { SectionNames } from '@core/core-types';
import { Subject } from 'rxjs';
import { ExportConfigs, ExportFormat } from '../export-types';

@Injectable()
export class ExportEditorService {
  exportedCode: {[K in SectionNames]: string} | object = {};
  format$ = new Subject<ExportFormat>();
  showComments$ = new Subject<boolean>();
  prefix$ = new Subject<string>();
  commonConfigs: ExportConfigs;

  set format(value: ExportFormat) {
    this.commonConfigs.format = value;
    this.format$.next(value);
  }

  get format() {
    return this.commonConfigs.format
  }

  set showComments(value: boolean) {
    this.commonConfigs.showComments = value;
    this.showComments$.next(value);
  }

  get showComments() {
    return this.commonConfigs.showComments;
  }

  set prefix(value: string) {
    this.commonConfigs.prefix = value;
    this.prefix$.next(value);
  }

  get prefix() {
    return this.commonConfigs.prefix;
  }

  constructor() {}

  setSectionCode(sectionName: SectionNames, code: string) {
    this.exportedCode[sectionName] = code;
  }

  setCommonConfigs(configs: ExportConfigs) {
    this.commonConfigs = configs;

    this.format = configs.format;
    this.prefix = configs.prefix;
    this.showComments = configs.showComments;
  }

  joinExportedCode(excludedSections: string[] = []) {
    let content = '';

    for (let sectionName in this.exportedCode) {
      if (!excludedSections.includes(sectionName)) {
        let sectionCode = this.exportedCode[sectionName];
        sectionCode += "\n\n";
        content += sectionCode;
      }
    }
  
    return content;
  }
}
