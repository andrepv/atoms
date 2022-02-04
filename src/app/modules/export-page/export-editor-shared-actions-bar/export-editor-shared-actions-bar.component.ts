import { Component, OnInit } from '@angular/core';
import { SectionNames } from '@core/core-types';
import { browserStorageDB } from '@core/storages/browser-storage/browser-storage-db';
import { ExportEditorService } from '../export-editor/export-editor.service';
import { ExportConfigs, ExportFormat } from '../export-types';

@Component({
  selector: 'app-export-editor-shared-actions-bar',
  templateUrl: './export-editor-shared-actions-bar.component.html',
  styleUrls: ['./export-editor-shared-actions-bar.component.less']
})
export class ExportEditorSharedActionsBarComponent implements OnInit {
  prefix = '';

  formats: {label: string, value: ExportFormat}[] = [
    {label: "CSS", value: "css"},
    {label: "Less", value: "less"},
    {label: "Sass", value: "sass"},
    {label: "Scss", value: "scss"},
    {label: "Stylus", value: "styl"},
    {label: "JavaScript", value: "js"}
  ];

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

  constructor(public editor: ExportEditorService) { }

  ngOnInit() {
    this.sections.map(section => {
      if (this.editor.commonConfigs.excludedSections.includes(section.value)) {
        section.checked = false;
      }
      return section;
    });

    this.prefix = this.editor.commonConfigs.prefix;
  }

  setFormat(value: ExportFormat) {
    this.updateStorage({format: value})
    this.editor.format = value;
  }

  setPrefix() {
    if (this.prefix !== this.editor.commonConfigs.prefix) {
      this.updateStorage({prefix: this.prefix})
      this.editor.prefix = this.prefix;
    }
  }

  toggleComments(value: boolean) {
    this.updateStorage({showComments: value})
    this.editor.showComments = value;
  }

  // @todo: move to  export-editor-section-checkbox component
  toggleSection() {
    this.sections.map(section => {
      const isExcluded = this.editor.commonConfigs.excludedSections.includes(section.value);

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

  canDownload() {
    return !(this.editor.commonConfigs.excludedSections.length === this.sections.length);
  }

  saveFileName(value: string) {
    this.editor.commonConfigs.fileName = value;
    this.updateStorage({fileName: value});
  }

  private excludeSection(section: any) {
    this.editor.commonConfigs.excludedSections = [
      ...this.editor.commonConfigs.excludedSections,
      section.value
    ];
    this.updateStorage({excludedSections: this.editor.commonConfigs.excludedSections});
  }

  private includeSection(section: any) {
    this.editor.commonConfigs.excludedSections = this.editor.commonConfigs.excludedSections.filter(value => value !== section.value);
    this.updateStorage({excludedSections: this.editor.commonConfigs.excludedSections});
  }

  private updateStorage(value: Partial<ExportConfigs>) {
    return browserStorageDB.exportConfigs.update(this.editor.commonConfigs.id, value);
  }
}
