import { db } from "@core/indexedDB";
import { ClipboardService } from "@core/services/clipboard.service";
import { SectionContentManagerService } from "@core/services/section-content-manager.service";

export function provideSectionDeps(dbTable: string) {
  return [
    {provide: 'tables', useValue: db[dbTable]},
    SectionContentManagerService,
    ClipboardService,
  ]
}