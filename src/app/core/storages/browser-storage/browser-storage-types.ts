import { StorageEntityManager, StorageGroup, StorageGroupsManager, StorageToken, StorageTokensManager } from "../storages-types";

export interface BrowserStorageEntityManager<T> extends StorageEntityManager<T> {
  table: Dexie.Table<T, number>;
}

export interface BrowserStorageGroupsManager<T extends StorageGroup> extends StorageGroupsManager<T>, BrowserStorageEntityManager<T> {}

export interface BrowserStorageTokensManager<T extends StorageToken> extends StorageTokensManager<T>, BrowserStorageEntityManager<T> {}