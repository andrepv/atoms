import { SectionNames } from "@core/core-types";
import { StorageGroup, StorageSectionContentManager, StorageToken } from "../storages-types";
import { BrowserStorageDB } from "./browser-storage-db";
import { BrowserStorageGroupsManager, BrowserStorageTokensManager } from "./browser-storage-types";

export default class BrowserStorageSectionContent<T extends StorageToken, G extends StorageGroup> implements StorageSectionContentManager<T, G> {
  constructor(
    public sectionName: SectionNames,
    public tokens: BrowserStorageTokensManager<T>,
    public groups: BrowserStorageGroupsManager<G>,
    private db: BrowserStorageDB,
  ) {}

  clear(themeId: number) {
    return this.db.transaction('rw', [this.tokens.table, this.groups.table], async () => {
      const groups = await this.groups.get({index: 'themeId', key: themeId});

      for (let group of groups) {
        await this.groups.delete(group.id);
      }
    })
  }

}