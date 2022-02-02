import { Table } from "dexie";
import { StorageToken } from "../storages-types";
import { BrowserStorageEntityManager } from "./browser-storage-entity-manager";

export class BrowserStorageSectionTokens<T extends StorageToken> extends BrowserStorageEntityManager<T> {

  constructor(public table: Table<T, number>) {
    super(table);
  }

  async isNameUnique(name: string, themeId: number) {
    const res = await this.table
    .where("name").equalsIgnoreCase(name)
    .and(token => token.themeId === themeId).toArray();
    return !Boolean(res.length);
  }
}