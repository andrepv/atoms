import { Injectable } from '@angular/core';
import { SectionNames } from '@core/core-types';
import { ClipboardService } from '@core/services/clipboard.service';
import SectionManagerContentService from '@core/services/section-manager-content.service';
import { browserStorageDB } from '@core/storages/browser-storage/browser-storage-db';
import { BehaviorSubject } from 'rxjs';
import { standardFormatters } from '../export-code-formatter/standard-formatters';
import { ExportEditorService } from '../export-editor/export-editor.service';
import { CodePreviewConfigs, ExportConfigsSection } from '../export-types';

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
    private editor: ExportEditorService,
    private clipboard: ClipboardService,

  ) {
    this.sectionName = sectionManager.name;
  }

  codeFormatters = standardFormatters;

  async load() {
    this.isLoading = true;
    let configs = await this.getConfigs();

    if (!configs) {
      configs = await this.addDefaultConfigs();
    }

    if (configs.code) {
      this.codePreviewConfigs = configs.code;
    }

    this.configs = configs;

    this.isLoading = false;
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
    const code = this.editor.exportedCode[this.sectionName];
    this.clipboard.copyText(code);
  }

  download() {}

  private async getConfigs() {
    return browserStorageDB.exportConfigsSection.table
    .where("commonConfigsId")
    .equals(this.editor.commonConfigs.id)
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
      commonConfigsId: this.editor.commonConfigs.id,
      sectionName: this.sectionName,
      fileName: this.sectionName.toLowerCase().split(' ').join('-'),
      code: {},
    }
  }
}
