import { Component, OnInit } from '@angular/core';
import { TextStylesDBGroup } from './text-styles.model';
import { SectionViewOption } from '@core/core-types';
import textStylesSectionProviders from './text-styles-section-providers';
import { ExportEditorSectionService } from '@shared/components/export-editor-section/export-editor-section.service';
import { ExportEditorService } from '@app/components/export-editor/export-editor.service';

@Component({
  selector: 'app-text-styles-section',
  templateUrl: './text-styles-section.component.html',
  styleUrls: ['./text-styles-section.component.less'],
  providers: [...textStylesSectionProviders, ExportEditorService]
})
export class TextStylesSectionComponent implements OnInit {
  readonly viewOptions: SectionViewOption<TextStylesDBGroup['view']>[] = [
    {name: 'detailed'},
    {name: 'default'},
    {name: 'minimal'},
  ];

  constructor(public exportConfigs: ExportEditorSectionService) {}

  ngOnInit() {}
}
