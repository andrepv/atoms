import { StoreService } from '@core/services/store.service';
import { StoreGroup, StorageGroupValue, SectionNames } from '@core/core-types';
import { ThemeManagerService } from './theme-manager.service';
import SectionManagerTokensService from './section-manager-tokens.service';
import { StorageGroup, StorageGroupsManager, StorageSectionContentManager, StorageToken } from '../storages/storages-types';
import { ClipboardService } from './clipboard.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Inject, Injectable } from '@angular/core';

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
    protected store: StoreService,
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

  load(query: {index: string, key: number}) {
    return this.storage.get(query);
  }

  async add(group = this.create()) {
    const groupId = await this.storage.add(group);
    const newGroup: StoreGroup<G, T> = {
      ...group,
      id: groupId,
      tokens: [],
    }
    this.store.addGroup(this.sectionName, newGroup)
    return groupId;
  }

  async delete(group: StoreGroup<G, T>) {
    await this.storage.delete(group.id);

    for (let token of group.tokens) {
      this.tokensManager.delete(token, group)
    }

    this.store.deleteGroup(this.sectionName, group.id);
  }

  clear(group: StoreGroup<G, T>) {
    for (let token of group.tokens) {
      this.tokensManager.delete(token, group)
    }
  }

  async rename(groupName: string, group: StoreGroup<G, T>) {
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
    group: StoreGroup<G, T>,
    changes: Partial<StorageGroupValue<G>>
  ) {
    const key = Object.keys(changes)[0];
    await this.storage.update(group.id, changes);
    this.store.getGroup(this.sectionName, group.id)[key] = changes[key]
  }

  get(groupId: number)  {
    return this.store.getGroup(this.sectionName, groupId) as StoreGroup<G, T>;
  }

  getList() {
    return this.store.getGroupList(this.sectionName) as StoreGroup<G, T>[]
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
      const group = this.get(groupId)

      for (let token of original.tokens) {
        await this.tokensManager.duplicate(token, group)
      }

      this.message.success('Done');

    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    } finally {
      this.message.remove(messageId);
    }
  }

  async duplicate(group: StoreGroup<G, T>) {
    const duplicate = this.getDuplicate(group);
    const groupId = await this.add(duplicate);
    const newGroup = this.get(groupId);

    for (let token of group.tokens) {
      await this.tokensManager.duplicate(token, newGroup)
    }
  }

  protected canPast(copiedData: any) {
    if (copiedData.type !== "group" || copiedData.section !== this.sectionName) return false;
    return true;
  }

  protected getDuplicate(copiedGroup: any) {
    const duplicate = {...copiedGroup}

    delete duplicate.id;
    delete duplicate.tokens;

    return {
      ...duplicate,
      ...this.create(duplicate.name)
    }
  }
}
