import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExportFormat } from '@core/types/export-types';

@Component({
  selector: 'app-export-editor-formats',
  templateUrl: './export-editor-formats.component.html',
  styleUrls: ['./export-editor-formats.component.less']
})
export class ExportEditorFormatsComponent implements OnInit {
  @Input() format: {label: string, value: ExportFormat};
  @Output() setFormat: EventEmitter<ExportFormat> = new EventEmitter();

  formats: {label: string, value: ExportFormat}[] = [
    {label: "CSS", value: "css"},
    {label: "Less", value: "less"},
    {label: "Sass", value: "sass"},
    {label: "Scss", value: "scss"},
    {label: "Stylus", value: "styl"},
    {label: "JavaScript", value: "js"}
  ];

  constructor() { }

  ngOnInit() {}
}
