import { Component, OnInit } from '@angular/core';
import { ExportEditorService } from '../export-editor/export-editor.service';
import { ExportColorFormat } from '../export-types';
import { ExportEditorSectionService } from './export-editor-section.service';

@Component({
  selector: 'app-export-editor-section',
  templateUrl: './export-editor-section.component.html',
  styleUrls: ['./export-editor-section.component.less'],
})
export class ExportEditorSectionComponent implements OnInit {
  colorFormats: ExportColorFormat[] = ['hex', 'rgb', 'hsl'];

  constructor(
    public editor: ExportEditorService,
    public editorSection: ExportEditorSectionService,
  ) {}

  ngOnInit() {
    this.editorSection.load();
  }
}
