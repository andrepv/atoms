import { Injectable } from "@angular/core";
import chroma from "chroma-js";
import { BehaviorSubject } from "rxjs";
import { ExportColorFormat } from "@core/types/export-types";
import { CacheToken } from "@core/core-types";
import { ExportEditorSectionService } from "@shared/components/export-editor-section/export-editor-section.service";

type ColorPaletteConfigs = {colorFormat: ExportColorFormat}

@Injectable()
export class ColorPaletteExportEditorService extends ExportEditorSectionService {
  colorFormats: ExportColorFormat[] = ['hex', 'rgb', 'hsl'];

  codePreviewConfigs$ = new BehaviorSubject<any>({colorFormat: 'hex'})

  getStyleValue(token: CacheToken, configs: ColorPaletteConfigs) {
    let color = token.color;

    if (configs.colorFormat === 'rgb') {
      color = chroma(token.color).css()
    } else if (configs.colorFormat === 'hsl') {
      color = chroma(token.color).css('hsl');
    }

    return color;
  }
}