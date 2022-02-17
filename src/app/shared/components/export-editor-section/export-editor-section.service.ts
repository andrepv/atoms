import { Injectable } from '@angular/core';
import { SectionNames, CacheToken } from '@core/core-types';
import { ClipboardService } from '@core/services/clipboard.service';
import SectionManagerContentService from '@core/services/section-manager-content.service';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { browserStorageDB } from '@core/storages/browser-storage/browser-storage-db';
import { CodePreviewConfigs, ExportConfigsSection } from '@core/types/export-types';
import { downloadFile } from '@utils/download-file';
import { BehaviorSubject } from 'rxjs';
import { standardFormatters } from '../export-code-preview/export-code-formatter/standard-formatters';
import { ExportEditorService } from '../../../components/export-editor/export-editor.service';

@Injectable()
export class ExportEditorSectionService {
  isLoading = false;
  configs: ExportConfigsSection;
  sectionName: SectionNames;

  codePreviewConfigs$ = new BehaviorSubject<null | CodePreviewConfigs>(null);

  set codePreviewConfigs(value: CodePreviewConfigs) {
    this.codePreviewConfigs$.next(value);
  }

  get codePreviewConfigs() {
    return this.codePreviewConfigs$.getValue();
  }

  constructor(
    sectionManager: SectionManagerContentService,
    protected editor: ExportEditorService,
    private tokensManager: SectionManagerTokensService,
    private clipboard: ClipboardService,

  ) {
    this.sectionName = sectionManager.name;
  }

  codeFormatters = standardFormatters;

  async load() {
    this.isLoading = true;
    try {
      let configs = await this.getConfigs();
  
      if (!configs) {
        configs = await this.addDefaultConfigs();
      }
  
      if (configs.code) {
        this.codePreviewConfigs = configs.code;
      }
  
      this.configs = configs;
    } finally {
      this.isLoading = false;
    }
  }

  setCodePreviewConfigs<T extends keyof CodePreviewConfigs>(key: T, value: CodePreviewConfigs[T]) {
    const codeConfigs = {...this.configs.code, [key]: value}
    browserStorageDB.exportConfigsSection.update(this.configs.id, {code: codeConfigs});
    this.configs.code = codeConfigs;

    this.codePreviewConfigs = codeConfigs;
  }

  saveFileName(value: string) {
    this.configs.fileName = value;
    browserStorageDB.exportConfigsSection.update(this.configs.id, {fileName: value});
  }

  copyCode() {
    const code = this.getCode();
    this.clipboard.copyText(code);
  }

  download() {
    const content = this.getCode();
    const fileName = this.getFileName();

    downloadFile(content, fileName);
  }

  getStyleValue(token: CacheToken, configs?: any) {
    return this.tokensManager.getStyleValue(token);
  }

  private getCode() {
    return this.editor.exportedCode[this.sectionName];
  }

  private getFileName() {
    return `${this.configs.fileName}.${this.editor.configs.format}`;
  }

  private async getConfigs() {
    return browserStorageDB.exportConfigsSection.table
    .where("commonConfigsId")
    .equals(this.editor.configs.id)
    .and(value => value.sectionName === this.sectionName)
    .first();
  }

  private async addDefaultConfigs() {
    let configs = this.createDefaultConfigs();

    if (this.codePreviewConfigs) {
      configs.code = this.codePreviewConfigs;
    }

    const id = await browserStorageDB.exportConfigsSection.add(configs);
    configs.id = id;

    return configs;
  }

  private createDefaultConfigs(): ExportConfigsSection {
    return {
      commonConfigsId: this.editor.configs.id,
      sectionName: this.sectionName,
      fileName: this.sectionName.toLowerCase().split(' ').join('-'),
      code: {},
    }
  }
}
