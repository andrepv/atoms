import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExportEditorService } from './export-editor.service';

@Component({
  selector: 'app-export-editor',
  templateUrl: './export-editor.component.html',
  styleUrls: ['./export-editor.component.less'],
  providers: [ExportEditorService]
})
export class ExportEditorComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public editor: ExportEditorService,
  ) {}

  async ngOnInit() {
    const exportId = parseInt(this.route.snapshot.paramMap.get("id"));
    await this.editor.load(exportId);
  }
}
