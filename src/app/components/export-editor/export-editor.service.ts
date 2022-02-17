import { Injectable } from '@angular/core';
import { SectionNames } from '@core/core-types';
import { downloadFile } from '@utils/download-file';
import { Subject } from 'rxjs';
import { ExportConfigs, ExportFormat } from '@core/types/export-types';
import { ExportService } from '@core/services/export.service';

@Injectable()
export class ExportEditorService {
  format$ = new Subject<ExportFormat>();
  showComments$ = new Subject<boolean>();
  prefix$ = new Subject<string>();

  exportedCode: {[K in SectionNames]?: string} = {};
  configs: ExportConfigs;
  isLoading = false;
  exportId: number;

  constructor(private exportConfigs: ExportService) {}

  async load(configId: number) {
    this.exportId = configId;
    this.isLoading = true;
    try {
      const configs = await this.exportConfigs.get(configId);
      this.setConfigs(configs);
    } finally {
      this.isLoading = false;
    }
  }

  setFormat(format: ExportFormat) {
    this.exportConfigs.storage.update(this.exportId, {format})
    this.configs.format = format;
    this.format$.next(format);
  }

  setPrefix(prefix: string) {
    this.exportConfigs.storage.update(this.exportId, {prefix})
    this.configs.prefix = prefix;
    this.prefix$.next(prefix);
  }

  toggleComments(showComments: boolean) {
    this.exportConfigs.storage.update(this.exportId, {showComments})
    this.configs.showComments = showComments;
    this.showComments$.next(showComments);
  }

  saveFileName(fileName: string) {
    this.exportConfigs.storage.update(this.exportId, {fileName});
    this.configs.fileName = fileName;
  }

  excludeSection(section: string) {
    this.configs.excludedSections = [
      ...this.configs.excludedSections,
      section
    ];

    this.exportConfigs.storage.update(this.exportId, {
      excludedSections: this.configs.excludedSections
    });
  }

  includeSection(section: string) {
    this.configs.excludedSections = this.configs.excludedSections.filter(value => value !== section);

    this.exportConfigs.storage.update(this.exportId, {
      excludedSections: this.configs.excludedSections
    });
  }

  setSectionCode(sectionName: SectionNames, code: string) {
    this.exportedCode[sectionName] = code;
  }

  download() {
    const content = this.joinExportedCode(this.configs.excludedSections);
    const fileName = `${this.configs.fileName}.${this.configs.format}`;

    downloadFile(content, fileName);
  }

  private setConfigs(configs: ExportConfigs) {
    this.configs = configs;

    this.setFormat(configs.format);
    this.setPrefix(configs.prefix);
    this.toggleComments(configs.showComments);
  }

  private joinExportedCode(excludedSections: string[] = []) {
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
