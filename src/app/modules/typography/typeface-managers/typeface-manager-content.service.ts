import { Inject, Injectable } from "@angular/core";
import SectionManagerGroupsService from "@core/services/section-manager-groups.service";
import SectionManagerContentService from "@core/services/section-manager-content.service";
import SectionManagerTokensService from "@core/services/section-manager-tokens.service";
import { SectionManagerCachedContentService } from "@core/services/section-manager-cached-content.service";
import { ThemeManagerService } from "@core/services/theme-manager.service";
import { FontManagerService } from "@typography/typeface-editor/font-manager.service";
import { StorageGroup, StorageSectionContentManager } from "@core/storages/storages-types";
import { TypefaceDBToken } from "@typography/typeface-section/typeface.model";

@Injectable()
export class TypefaceManagerContentService extends SectionManagerContentService<TypefaceDBToken, StorageGroup> {
  constructor(
    @Inject('storage') protected storage: StorageSectionContentManager,
    protected groups: SectionManagerGroupsService,
    protected tokens: SectionManagerTokensService,
    protected theme: ThemeManagerService,
    protected cache: SectionManagerCachedContentService,
    private fontManager: FontManagerService,
  ) {
    super(storage, groups, tokens, theme, cache);
  }

  async load() {
    const groups = await super.load();
    this.loadFonts();
    return groups;
  }

  private loadFonts() {
    const groupList: any = this.groups.getList();
    for (let group of groupList) {
      this.fontManager.load(group.tokens);
    }
  }
}