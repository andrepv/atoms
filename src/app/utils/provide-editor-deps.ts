import { db } from "@core/indexedDB";
import { SectionContentManagerService } from "@core/services/section-content-manager.service";

export function provideEditorDeps(dbTable: string) {
  return [
    {provide: 'tables', useValue: db[dbTable]},
    SectionContentManagerService,
  ]
}