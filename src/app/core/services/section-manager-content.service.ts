import { Inject, Injectable } from "@angular/core";
import { SectionNames } from "../core-types";
import SectionManagerGroupsService from "./section-manager-groups.service";
import SectionManagerTokensService from "./section-manager-tokens.service";
import { StoreService } from "./store.service";
import { ThemeManagerService } from "./theme-manager.service";
import { StorageGroup, StorageSectionContentManager, StorageToken } from "../storages/storages-types";

@Injectable()
export default class SectionManagerContentService<T extends StorageToken = any, G extends StorageGroup = any> {
  isLoading = false;
  name: SectionNames;

  constructor(
    @Inject('storage') protected storage: StorageSectionContentManager<T, G>,
    protected groups: SectionManagerGroupsService<T, G>,
    protected tokens: SectionManagerTokensService<T, G>,
    protected theme: ThemeManagerService,
    protected store: StoreService,
  ) {
    this.name = storage.sectionName;
  }

  async load() {
    this.isLoading = true;

    let groups: any = await this.groups.load({index: "themeId", key: this.theme.selected.id});

    if (groups.length) {
      for (let group of groups) {
        const tokens = await this.tokens.load({index: "groupId", key: group.id});
        group.tokens = tokens;
      }
    }

    this.store.setSectionContent(this.name, groups)
    this.isLoading = false;
    return groups;
  }
}