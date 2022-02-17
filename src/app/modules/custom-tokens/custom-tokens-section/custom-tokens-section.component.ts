import { Component, OnInit } from '@angular/core';
import { ExportEditorService } from '../../../components/export-editor/export-editor.service';
import customTokensSectionProviders from './custom-tokens-section-providers';

@Component({
  selector: 'app-custom-tokens-section',
  templateUrl: './custom-tokens-section.component.html',
  styleUrls: ['./custom-tokens-section.component.less'],
  providers: [...customTokensSectionProviders, ExportEditorService]
})
export class CustomTokensSectionComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
