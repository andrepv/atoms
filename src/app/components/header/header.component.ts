import { Component, OnInit } from '@angular/core';
import { ExportEditorService } from '../export-editor/export-editor.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  providers: [ExportEditorService]
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}