import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExportConfigs } from '@core/types/export-types';
import { ExportService } from '@core/services/export.service';

@Component({
  selector: 'app-export-list',
  templateUrl: './export-list.component.html',
  styleUrls: ['./export-list.component.less']
})
export class ExportListComponent implements OnInit {
  @Output() edit: EventEmitter<ExportConfigs[]> = new EventEmitter();

  constructor(public exportConfigs: ExportService) {}

  ngOnInit() {
    this.exportConfigs.load();
  }

  delete(event: Event, id: number) {
    event.stopPropagation();
    this.exportConfigs.delete(id)
  }
}
