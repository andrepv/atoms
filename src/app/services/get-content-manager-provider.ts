import { InjectionToken, Provider } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { ContentManagerService } from "./content-manager.service";
import { ITables, Table } from "./db.service";
import { StoreService } from "./store.service";

export function getContentManagerProvider<T extends Table, G extends Table>(tables: ITables<T, G>) {
  const PROVIDER_TOKEN = new InjectionToken("configured content manager provider");

  const provider: Provider[] = [
    {
      provide: PROVIDER_TOKEN,
      useFactory: (store: StoreService, message: NzMessageService) => {
        return new ContentManagerService(tables, store, message);
      },
      deps: [StoreService, NzMessageService]
    }
  ]

  return {
    token: PROVIDER_TOKEN,
    provider
  }
}