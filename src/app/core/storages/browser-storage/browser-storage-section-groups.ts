import { Table } from "dexie";
import { StorageGroup } from "../storages-types";
import { BrowserStorageDB, browserStorageDB } from "./browser-storage-db";
import { BrowserStorageEntityManager } from "./browser-storage-entity-manager";
import { BrowserStorageTokensManager } from "./browser-storage-types";

export class BrowserStorageSectionGroups<T extends StorageGroup> extends BrowserStorageEntityManager<T> {
  constructor(
    public table: Table<T, number>,
    private tokens: BrowserStorageTokensManager<any>,
    private db: BrowserStorageDB,
  ) {
    super(table);
  }

  delete(key: number) {
    return this.db.transaction('rw', [this.tokens.table, this.table], async () => {
      await this.table.delete(key);

      const tokens = await this.tokens.get({index: 'groupId', key});

      for (let token of tokens) {
        if (token.groupId === key) {
          await this.tokens.delete(token.id);
        }
      }
    });
  }
}