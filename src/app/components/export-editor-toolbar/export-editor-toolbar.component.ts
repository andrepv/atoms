import { Component, OnInit } from '@angular/core';
import { ExportEditorService } from '../export-editor/export-editor.service';

@Component({
  selector: 'app-export-editor-toolbar',
  templateUrl: './export-editor-toolbar.component.html',
  styleUrls: ['./export-editor-toolbar.component.less']
})
export class ExportEditorToolbarComponent implements OnInit {
  prefix = '';

  constructor(public editableExport: ExportEditorService) { }

  ngOnInit() {
    this.prefix = this.editableExport.configs.prefix;
  }

  setPrefix() {
    if (this.prefix !== this.editableExport.configs.prefix) {
      this.editableExport.setPrefix(this.prefix);
    }
  }

  canDownload() {
    return true;
  }
}
