import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SectionNames } from '@core/core-types';
import { ExportEditorService } from '../export-editor/export-editor.service';

@Component({
  selector: 'app-export-editor-sections-toggle',
  templateUrl: './export-editor-sections-toggle.component.html',
  styleUrls: ['./export-editor-sections-toggle.component.less']
})
export class ExportEditorSectionsToggleComponent implements OnInit {
  @Output() excludeSection: EventEmitter<string> = new EventEmitter();
  @Output() includeSection: EventEmitter<string> = new EventEmitter();

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

  constructor(private editableExport: ExportEditorService) { }

  ngOnInit() {
    const {excludedSections} = this.editableExport.configs;

    this.sections.map(section => {
      if (excludedSections.includes(section.value)) {
        section.checked = false;
      }
      return section;
    });
  }

  toggleSection() {
    const {excludedSections} = this.editableExport.configs;

    this.sections.map(section => {
      const isExcluded = excludedSections.includes(section.value);

      if (!section.checked && !isExcluded) {
        this.excludeSection.emit(section.value);
        return;
      }

      if (section.checked && isExcluded) {
        this.includeSection.emit(section.value);
        return;
      }
    })
  }
}
