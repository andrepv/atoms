import { SectionNames } from "@core/core-types";
import { PromiseExtended } from "dexie";

export interface StorageEntityManager<T> {
  get({index, key}: {index: string, key: number}): Promise<T[]>;
  add(item: T): Promise<number> | PromiseExtended<number>;
  delete(key: number): Promise<any> | PromiseExtended<any>;
  update(key: number | T, changes: {[keyPath: string]: any}): Promise<any> | PromiseExtended<any>;
  loadList(params?: {orderBy?: string; reverse?: boolean;}): PromiseExtended<T[]> | Promise<T[]>;
}

export interface StorageGroupsManager<G extends StorageGroup> extends StorageEntityManager<G> {};

export interface StorageTokensManager<T extends StorageToken> extends StorageEntityManager<T> {
  isNameUnique(name: string, themeId: number): Promise<boolean> | PromiseExtended<boolean>;
};

export interface StorageSectionContentManager<T extends StorageToken = any, G extends StorageGroup = any> {
  groups: StorageGroupsManager<G>;
  tokens: StorageTokensManager<T>;

  sectionName: SectionNames;
}

export interface StorageToken {
  id?: number;
  name: string;
  groupId: number;
  themeId: number;
}

export interface StorageGroup {
  id: number;
  name: string;
  themeId: number;
}