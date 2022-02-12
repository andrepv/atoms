import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ExportEditorService } from '../../../layout/export-editor/export-editor.service';
import { ExportConfigs } from '@core/types/export-types';

@Component({
  selector: 'app-section-code-export',
  templateUrl: './section-code-export.component.html',
  styleUrls: ['./section-code-export.component.less']
})
export class SectionCodeExportComponent implements OnInit {
  @Input() codePreviewTemplate: TemplateRef<any>;

  isExportSelected = false;
  isCodePreviewLoading = false;

  constructor(private exportConfigs: ExportEditorService) { }

  ngOnInit() {}

  backToExportList = () => {
    this.isExportSelected = false;
  }

  async selectExport(configs: ExportConfigs) {
    this.isCodePreviewLoading = true;

    try {
      await this.exportConfigs.load(configs.id);
      this.isExportSelected = true;
    } finally {
      this.isCodePreviewLoading = false;
    }
  }

}
