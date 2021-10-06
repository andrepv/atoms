import { InjectionToken, Provider } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { ContentManagerService } from "../services/content-manager.service";
import { ITables, Table } from "../services/db.service";
import { EditorService } from "../services/editor.service";
import { StoreService } from "../services/store.service";

export function getContentManagerProvider<T extends Table, G extends Table>(tables: ITables<T, G>) {
  const PROVIDER_TOKEN = new InjectionToken("configured content manager provider");

  const provider: Provider[] = [
    {
      provide: PROVIDER_TOKEN,
      useFactory: (
        store: StoreService,
        message: NzMessageService,
        editor: EditorService,
      ) => {
        return new ContentManagerService(tables, store, message, editor);
      },
      deps: [StoreService, NzMessageService, EditorService]
    }
  ]

  return {
    token: PROVIDER_TOKEN,
    provider
  }
}