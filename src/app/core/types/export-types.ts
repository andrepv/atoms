import { SectionNames } from "@core/core-types";
import { BrowserStorageEntityManager } from "@core/storages/browser-storage/browser-storage-types";

export type ExportFormat = "css" | "less" | "sass" | "scss" | "styl" | "js";
export type ExportColorFormat = "hex" | "rgb" | "hsl";

export type CodePreviewConfigs = {
  colorFormat?: ExportColorFormat,
  useReferences?: boolean
}

export type ExportConfigs = {
  id?: number,
  name: string,
  format: ExportFormat,
  prefix: string,
  fileName: string,
  showComments: boolean;
  excludedSections: string[];
}

export type ExportConfigsSection<T = {}> = T & {
  id?: number,
  commonConfigsId: number,
  sectionName: SectionNames,
  fileName: string,
  code: CodePreviewConfigs
}

export type ExportConfigsStorage = BrowserStorageEntityManager<ExportConfigs>;
export type ExportConfigsSectionStorage = BrowserStorageEntityManager<ExportConfigsSection>;