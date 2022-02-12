import { Component, OnInit } from '@angular/core';
import { SectionViewOption } from '@core/core-types';
import { ColorPaletteDBGroup } from './color-palette.model';
import colorPaletteSectionProviders from './color-palette-section-providers';
import { ExportEditorSectionService } from '@shared/components/export-editor-section/export-editor-section.service';
import { ExportEditorService } from '../../../layout/export-editor/export-editor.service';

@Component({
  selector: 'app-color-palette-section',
  templateUrl: './color-palette-section.component.html',
  styleUrls: ['./color-palette-section.component.less'],
  providers: [...colorPaletteSectionProviders, ExportEditorService]
})
export class ColorPaletteSectionComponent implements OnInit {
  readonly viewOptions: SectionViewOption<ColorPaletteDBGroup['view']>[] = [
    {name: 'grouped'},
    {name: 'default'},
    {name: 'inline'},
  ];
  constructor(public exportConfigs: ExportEditorSectionService) {}

  ngOnInit() {}
}
