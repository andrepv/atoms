import { Table } from "dexie";
import { StorageEntityManager } from "../storages-types";

export class BrowserStorageEntityManager<T> implements StorageEntityManager<T> {

  constructor(public table: Table<T, number>) {}

  // get({index: key})
  get({ index, key }: { index: string; key: number; }) {
    return this.table.where(index).equals(key).toArray();
  }

  add(item: T) {
    return this.table.add(item);
  }

  delete(key: number) {
    return this.table.delete(key);
  }

  update(key: number | T, changes: { [keyPath: string]: any; }) {
    return this.table.update(key, changes)
  }

  loadList(params: {orderBy?: string, reverse?: boolean} = {}) {
    const {orderBy, reverse} = params;
    let collection: any = this.table;

    if (orderBy) {
      collection = collection.orderBy(params.orderBy)
    }

    if (reverse) {
      collection = collection.reverse()
    }

    return collection.toArray();
  }
}