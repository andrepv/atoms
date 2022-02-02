import { NzMessageService } from 'ng-zorro-antd/message';
import { StoreService } from '@core/services/store.service';
import { getRandomChars } from '@utils';
import { StoreToken, StoreGroup, StorageTokenValue, SectionNames } from '@core/core-types';
import { ThemeManagerService } from './theme-manager.service';
import { StorageGroup, StorageSectionContentManager, StorageToken, StorageTokensManager } from '../storages/storages-types';
import { ClipboardService } from '../services/clipboard.service';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export default class SectionManagerTokensService<T extends StorageToken = any, G extends StorageGroup = any> {
  private sectionName: SectionNames;
  storage: StorageTokensManager<T>

  get selectedThemeId() {
    return this.theme.selected.id;
  }

  constructor(
    @Inject('storage') storageSection: StorageSectionContentManager<T, G>,
    protected store: StoreService,
    protected message: NzMessageService,
    protected theme: ThemeManagerService,
    protected clipboard: ClipboardService,
  ) {
    this.storage = storageSection.tokens;
    this.sectionName = storageSection.sectionName;
  }

  load(query: {index: string, key: number}) {
    return this.storage.get(query);
  }

  async addToGroup(group: StoreGroup<G, T>, token = this.create(group)) {
    return this.add(token, group.tokens);
  }

  async addToContainer(token: T, container: any[]) {
    return this.add(token, container);
  }

  async delete(token: StoreToken<T>, group: StoreGroup<G, T>) {
    await this.storage.delete(token.id);
    this.store.deleteToken(this.sectionName, group, token.id)
  }

  async rename(tokenName: string, token: StoreToken<T>) {
    const isUnique = await this.theme.isTokenNameUnique(tokenName);
    if (!isUnique) {
      this.message.error('The token name must be unique');
      return;
    }

    await this.storage.update(token.id, {name: tokenName});

    token.name = tokenName
  }

  getDefaultValue(group: StoreGroup<G, T>): any {
    return {}
  }

  create(
    group: StoreGroup<G, T>,
    value = this.getDefaultValue(group),
    name = `token-${getRandomChars()}`,
  ) {
    return {
      name,
      groupId: group.id,
      themeId: this.selectedThemeId,
      ...value
    };
  }

  async update(
    token: StoreToken<T>,
    changes: Partial<StorageTokenValue<T>>,
    updateStore = true,
  ) {
    const keys = Object.keys(changes);

    for (let key of keys) {
      await this.storage.update(token.id, changes);

      if (updateStore) {
        token[key] = changes[key];
      }
    }
  }

  getList(): StoreToken<T>[] {
    return this.store.getSectionTokens(this.sectionName)
  }

  get(tokenId: number): StoreToken<T> | false {
    return this.store.getSectionToken(this.sectionName, tokenId)
  }

  async copy(content: T) {
    this.clipboard.copyText(JSON.stringify({
      section: this.sectionName,
      content,
      type: 'token'
    }));
  }

  async past(group: StoreGroup<G, T>) {
    try {
      const data = await this.clipboard.getCopiedData();
      if (this.canPast(data)) {
        const duplicate = this.getDuplicate(data.content, group);
        await this.addToGroup(group, duplicate);
        this.message.success('Done');
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  }

  duplicate(token: StoreToken<T>, group: StoreGroup<G, T>) {
    const duplicate = this.getDuplicate(token, group);
    return this.addToGroup(group, duplicate);
  }

  protected canPast(copiedData: any) {
    if (copiedData.type !== "token" || copiedData.section !== this.sectionName) return false;
    return true;
  }

  protected getDuplicate(originalToken: T, group: StoreGroup<G, T>): T {
    const duplicate = {...originalToken};
    const tokenName = `${duplicate.name}-${getRandomChars(4)}`;
    delete duplicate.id;

    return {
      ...duplicate,
      ...this.create(group, {}, tokenName)
    };
  }

  protected async add(token: T, container: any[]) {
    const tokenId = await this.storage.add(token);
    if (tokenId) {
      const newToken = {id: tokenId, ...token};
      container.push(newToken);
      return newToken;
    }
  }
}