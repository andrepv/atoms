import { SectionManagerCachedContentService  } from '@core/services/section-manager-cached-content.service';
import { CacheGroup, StorageGroupValue, SectionNames, CacheToken } from '@core/core-types';
import { ThemeManagerService } from './theme-manager.service';
import SectionManagerTokensService from './section-manager-tokens.service';
import { StorageGroup, StorageGroupsManager, StorageSectionContentManager, StorageToken } from '../storages/storages-types';
import { ClipboardService } from './clipboard.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Inject, Injectable } from '@angular/core';
import { deepClone } from '@utils/deep-clone';

@Injectable()
export default class SectionManagerGroupsService<T extends StorageToken = any, G extends StorageGroup = any> {
  private sectionName: SectionNames;
  storage: StorageGroupsManager<G>

  get selectedThemeId() {
    return this.themeManager.selected.id;
  }

  constructor(
    @Inject('storage') storageSection: StorageSectionContentManager<T, G>,
    protected tokensManager: SectionManagerTokensService<T, G>,
    protected cache: SectionManagerCachedContentService,
    protected themeManager: ThemeManagerService,
    protected clipboard: ClipboardService,
    protected message: NzMessageService,
  ) {
    this.storage = storageSection.groups;
    this.sectionName = storageSection.sectionName
  }

  getDefaultValue(): Partial<StorageGroupValue<G>> {
    return {};
  }

  getDefaultTokens() {
    return [];
  }

  load(query: {index: string, key: number}) {
    return this.storage.get(query);
  }

  async add(group = this.create()) {
    const groupId = await this.storage.add(group);
    const newGroup: CacheGroup<G, T> = {
      ...group,
      id: groupId,
      tokens: this.getDefaultTokens(),
    }
    this.cache.addGroup(this.sectionName, newGroup)
    return groupId;
  }

  async delete(group: CacheGroup<G, T>) {
    await this.storage.delete(group.id);

    for (let token of group.tokens) {
      this.tokensManager.delete(token, group)
    }

    this.cache.deleteGroup(this.sectionName, group.id);
  }

  clear(group: CacheGroup<G, T>) {
    for (let token of group.tokens) {
      this.tokensManager.delete(token, group)
    }
  }

  async rename(groupName: string, group: CacheGroup<G, T>) {
    await this.storage.update(group.id, {name: groupName});
    group.name = groupName
  }

  create(name = "group") {
    return {
      name,
      themeId: this.selectedThemeId,
      ...this.getDefaultValue(),
    } as G;
  }

  async update(
    group: CacheGroup<G, T>,
    changes: Partial<StorageGroupValue<G>>
  ) {
    const key = Object.keys(changes)[0];
    await this.storage.update(group.id, changes);
    this.cache.getGroup(this.sectionName, group.id)[key] = changes[key]
  }

  get(groupId: number)  {
    return this.cache.getGroup(this.sectionName, groupId) as CacheGroup<G, T>;
  }

  getList() {
    return this.cache.getGroupList(this.sectionName) as CacheGroup<G, T>[]
  }

  async copy(content: T) {
    this.clipboard.copyText(JSON.stringify({
      section: this.sectionName,
      content,
      type: 'group'
    }));
  }

  async past() {
    const {messageId} = this.message.loading('Action in progress..');
    try {
      const copiedData = await this.clipboard.getCopiedData();

      if (!this.canPast(copiedData)) {
        this.message.remove(messageId);
        return;
      }

      const original = copiedData.content;
      const duplicate = this.getDuplicate(original)

      const groupId = await this.add(duplicate);
      const group = this.get(groupId);

      await this.duplicateTokens(group, original.tokens);

      this.message.success('Done');

    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    } finally {
      this.message.remove(messageId);
    }
  }

  async duplicate(group: CacheGroup<G, T>) {
    const duplicate = this.getDuplicate(group);
    const groupId = await this.add(duplicate);
    const newGroup = this.get(groupId);

    await this.duplicateTokens(newGroup, group.tokens);
  }

  protected async duplicateTokens(
    group: CacheGroup<G, T>,
    tokens: CacheToken<T>[]
  ) {
    for (let token of tokens) {
      await this.tokensManager.duplicate(token, group)
    }
  }

  protected canPast(copiedData: any) {
    if (copiedData.type !== "group" || copiedData.section !== this.sectionName) return false;
    return true;
  }

  protected getDuplicate(copiedGroup: any) {
    const duplicate = deepClone(copiedGroup);

    delete duplicate.id;
    delete duplicate.tokens;

    return {
      ...duplicate,
      ...this.create(duplicate.name)
    }
  }
}
