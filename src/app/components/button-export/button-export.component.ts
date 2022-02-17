import { Component, OnInit, ViewChild } from '@angular/core';
import { SectionCodeExportComponent } from '@shared/components/section-code-export/section-code-export.component';

@Component({
  selector: 'app-button-export',
  templateUrl: './button-export.component.html',
  styleUrls: ['./button-export.component.less']
})
export class ButtonExportComponent implements OnInit {
  @ViewChild(SectionCodeExportComponent) sectionCodeExport: SectionCodeExportComponent;
  isModalVisible = false;

  get isExportSelected() {
    return this.sectionCodeExport?.isExportSelected ?? false;
  }

  ngOnInit() {}

  showModal() {
    this.isModalVisible = true;
  }

  hideModal() {
    this.isModalVisible = false;
  }
}
