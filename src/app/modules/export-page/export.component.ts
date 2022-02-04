import { Component, OnInit } from '@angular/core';
import { ExportService } from './export.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.less']
})
export class ExportComponent implements OnInit {
  constructor(public exportConfigs: ExportService) {}

  ngOnInit() {
    this.exportConfigs.load();
  }
}
