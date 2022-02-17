import { Component, OnInit } from '@angular/core';
import { ExportEditorService } from './export-editor.service';

@Component({
  selector: 'app-export-editor',
  templateUrl: './export-editor.component.html',
  styleUrls: ['./export-editor.component.less'],
})
export class ExportEditorComponent implements OnInit {
  constructor(public editor: ExportEditorService) {}

  async ngOnInit() {
    await this.editor.load(this.editor.exportId);
  }
}
