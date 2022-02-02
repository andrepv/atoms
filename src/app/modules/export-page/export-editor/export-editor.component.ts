import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SectionNames } from '@core/core-types';
import { browserStorageDB } from '@core/storages/browser-storage/browser-storage-db';
import { ExportConfigs, ExportFormat } from '../export-types';
import { ExportEditorService } from './export-editor.service';

@Component({
  selector: 'app-export-editor',
  templateUrl: './export-editor.component.html',
  styleUrls: ['./export-editor.component.less'],
  providers: [ExportEditorService]
})
export class ExportEditorComponent implements OnInit {
  prefix = '';

  formats: {label: string, value: ExportFormat}[] = [
    {label: "CSS", value: "css"},
    {label: "Less", value: "less"},
    {label: "Sass", value: "sass"},
    {label: "Scss", value: "scss"},
    {label: "Stylus", value: "styl"},
    {label: "JavaScript", value: "js"}
  ];

  commonConfigs: ExportConfigs;
  isLoading = false;

  sections: {label: string; value: SectionNames; checked: boolean}[] = [
    { label: 'TypeFace', value: 'Type Face', checked: true },
    { label: 'Text Styles', value: 'Text Styles', checked: true },
    { label: 'Color Palette', value: 'Color Palette', checked: true },
    { label: 'Spacing', value: 'Spacing', checked: true },
    { label: 'Box Shadow', value: 'Box Shadow', checked: true },
    { label: 'Borders', value: 'Borders', checked: true },
    { label: 'Border Radius', value: 'Border Radius', checked: true },
    { label: 'Durations', value: 'Durations', checked: true },
    { label: 'Custom Tokens', value: 'Custom Tokens', checked: true },
  ];

  constructor(
    private route: ActivatedRoute,
    private editor: ExportEditorService,
  ) {}

  async ngOnInit() {
    this.isLoading = true;

    const commonConfigsId = parseInt(this.route.snapshot.paramMap.get("id"));

    this.commonConfigs = await browserStorageDB.exportConfigs.get({index: 'commonConfigsId', key: commonConfigsId})[0];
    this.prefix = this.commonConfigs.prefix;

    this.sections.map(section => {
      if (this.commonConfigs.excludedSections.includes(section.value)) {
        section.checked = false;
      }
      return section;
    });

    this.editor.setCommonConfigs(this.commonConfigs);

    this.isLoading = false;
  }

  setFormat(value: ExportFormat) {
    this.updateCommonConfigs({format: value})
    this.commonConfigs.format = value;
    this.editor.format = value;
  }

  setPrefix() {
    if (this.prefix !== this.commonConfigs.prefix) {
      this.updateCommonConfigs({prefix: this.prefix})
      this.commonConfigs.prefix = this.prefix;
      this.editor.prefix = this.prefix;
    }
  }

  toggleComments(value: boolean) {
    this.updateCommonConfigs({showComments: value})
    this.commonConfigs.showComments = value;
    this.editor.showComments = value;
  }

  toggleSection() {
    this.sections.map(section => {
      const isExcluded = this.commonConfigs.excludedSections.includes(section.value);
      if (!section.checked && !isExcluded) {
        this.excludeSection(section);
        return;
      }
      if (section.checked && isExcluded) {
        this.includeSection(section);
        return;
      }
    })
  }

  download() {
    const content = this.editor.joinExportedCode(this.commonConfigs.excludedSections);

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `${this.commonConfigs.fileName}.${this.commonConfigs.format}`);

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
  }

  canDownload() {
    return !(this.commonConfigs.excludedSections.length === this.sections.length);
  }

  saveFileName(value: string) {
    this.commonConfigs.fileName = value;
    this.updateCommonConfigs({fileName: value});
  }

  private excludeSection(section: any) {
    this.commonConfigs.excludedSections = [
      ...this.commonConfigs.excludedSections,
      section.value
    ];
    this.updateCommonConfigs({excludedSections: this.commonConfigs.excludedSections});
  }

  private includeSection(section: any) {
    this.commonConfigs.excludedSections = this.commonConfigs.excludedSections.filter(value => value !== section.value);
    this.updateCommonConfigs({excludedSections: this.commonConfigs.excludedSections});
  }

  private updateCommonConfigs(value: Partial<ExportConfigs>) {
    return browserStorageDB.exportConfigs.update(this.commonConfigs.id, value);
  }
}
