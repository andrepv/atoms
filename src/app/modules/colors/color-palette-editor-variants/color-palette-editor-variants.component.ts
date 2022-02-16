import { Component, Input, OnInit } from '@angular/core';
import { ColorVariants } from './color-variants';

@Component({
  selector: 'app-color-palette-editor-variants',
  templateUrl: './color-palette-editor-variants.component.html',
  styleUrls: ['./color-palette-editor-variants.component.less']
})
export class ColorPaletteEditorVariantsComponent implements OnInit {
  @Input() title: string;
  @Input() mixRatioName: string;

  constructor(public variants: ColorVariants) {}

  ngOnInit() {}
}
