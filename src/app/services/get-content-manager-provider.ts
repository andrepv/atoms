import { InjectionToken, Provider } from "@angular/core";
import { ContentManagerService } from "./content-manager.service";
import { ITables, Table } from "./db.service";
import { StoreService } from "./store.service";

export function getContentManagerProvider<T extends Table, G extends Table>(tables: ITables<T, G>) {
  const PROVIDER_TOKEN = new InjectionToken("configured content manager provider");

  const provider: Provider[] = [
    {
      provide: PROVIDER_TOKEN,
      useFactory: (store: StoreService) => {
        return new ContentManagerService(tables, store);
      },
      deps: [StoreService]
    }
  ]

  return {
    token: PROVIDER_TOKEN,
    provider
  }
}