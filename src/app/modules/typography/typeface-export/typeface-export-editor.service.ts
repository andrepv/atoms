import { Injectable } from "@angular/core";
import { StoreToken } from "@core/core-types";
import { ExportEditorSectionService } from "@shared/components/export-editor-section/export-editor-section.service";

@Injectable()
export class TypefaceExportEditorService extends ExportEditorSectionService {
  getStyleValue(token: StoreToken<any>) {
    const quote = this.editor.configs.format === "js" ? '' : '"';
    return `${quote}${token.family}${quote}`;
  }
}