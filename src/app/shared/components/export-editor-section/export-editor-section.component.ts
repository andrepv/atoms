import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ExportColorFormat } from '@core/types/export-types';
import { ExportEditorService } from '../../../components/export-editor/export-editor.service';
import { ExportEditorSectionService } from './export-editor-section.service';

@Component({
  selector: 'app-export-editor-section',
  templateUrl: './export-editor-section.component.html',
  styleUrls: ['./export-editor-section.component.less'],
})
export class ExportEditorSectionComponent implements OnInit {
  colorFormats: ExportColorFormat[] = ['hex', 'rgb', 'hsl'];

  @Input() headerTemplateRef: TemplateRef<any>;

  constructor(
    public editor: ExportEditorService,
    public editorSection: ExportEditorSectionService,
  ) {}

  ngOnInit() {
    this.editorSection.load();
  }
}
