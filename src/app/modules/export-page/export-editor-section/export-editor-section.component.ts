import { Component, Inject, OnInit } from '@angular/core';
import { ClipboardService } from '@core/services/clipboard.service';
import { ExportEditorService } from '../export-editor/export-editor.service';
import { ExportColorFormat, ExportConfigsSection, CodePreviewConfigs } from '../export-types';
import { ExportEditorSectionService } from './export-editor-section.service';

@Component({
  selector: 'app-export-editor-section',
  templateUrl: './export-editor-section.component.html',
  styleUrls: ['./export-editor-section.component.less'],
  providers: [ClipboardService]
})
export class ExportEditorSectionComponent implements OnInit {
  colorFormats: ExportColorFormat[] = ['hex', 'rgb', 'hsl'];
  configs: ExportConfigsSection;
  isLoading = false;

  get sectionName() {
    return this.sectionTables.name;
  }

  constructor(
    @Inject('tables') private sectionTables: any,
    public editor: ExportEditorService,
    private editorSection: ExportEditorSectionService,
    private clipboard: ClipboardService,
  ) { }

  async ngOnInit() {
    this.isLoading = true;
    this.configs = await this.getExportConfigs();
    this.isLoading = false;
  }

  setCodePreviewConfigs<T extends keyof CodePreviewConfigs>(key: T, value: CodePreviewConfigs[T]) {
    const codeConfigs = {...this.configs.code, [key]: value}
    db.exportConfigsSection.update(this.configs.id, {code: codeConfigs});
    this.configs.code = codeConfigs;

    this.editorSection.codePreviewConfigs = codeConfigs;
  }

  saveFileName(value: string) {
    this.configs.fileName = value;
    db.exportConfigsSection.update(this.configs.id, {fileName: value});
  }

  copyCode() {
    const code = this.editor.exportedCode[this.sectionTables.name];
    this.clipboard.copyText(code);
  }

  download() {}

  private async getExportConfigs() {
    let configs = await db.exportConfigsSection
    .where("commonConfigsId")
    .equals(this.editor.commonConfigs.id)
    .and(value => value.sectionName === this.sectionName)
    .first();

    if (!configs) {
      configs = await this.addExportConfigs();
    }

    if (configs.code) {
      this.editorSection.codePreviewConfigs = configs.code;
    }

    return configs;
  }

  private async addExportConfigs() {
    let configs: ExportConfigsSection = {
      commonConfigsId: this.editor.commonConfigs.id,
      sectionName: this.sectionName,
      fileName: this.sectionName.toLowerCase().split(' ').join('-'),
      code: {},
    }

    if (this.editorSection.codePreviewConfigs) {
      configs.code = this.editorSection.codePreviewConfigs;
    }

    const id = await db.exportConfigsSection.add(configs);
    configs.id = id;

    return configs;
  }
}
