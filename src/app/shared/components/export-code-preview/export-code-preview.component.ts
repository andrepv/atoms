import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExportCodePreviewService } from './export-code-preview.service';

@Component({
  selector: 'app-export-code-preview',
  templateUrl: './export-code-preview.component.html',
  styleUrls: ['./export-code-preview.component.less'],
  providers: [ExportCodePreviewService],
})
export class ExportCodePreviewComponent implements OnInit, OnDestroy {

  constructor(public service: ExportCodePreviewService) {}

  ngOnInit() {
    this.service.onInit();
  }

  ngOnDestroy() {
    this.service.onDestroy();
  }
}
