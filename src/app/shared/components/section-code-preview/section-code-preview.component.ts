import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ExportEditorService } from '../../../components/export-editor/export-editor.service';

type InputData = {
  backToExportList: () => any;
}

@Component({
  selector: 'app-section-code-preview',
  templateUrl: './section-code-preview.component.html',
  styleUrls: ['./section-code-preview.component.less']
})
export class SectionCodePreviewComponent implements OnInit {
  @Input() data: InputData;
  @Input() sectionConfigsTemplate: TemplateRef<any>

  constructor(public editor: ExportEditorService) {}

  ngOnInit() {}
}
