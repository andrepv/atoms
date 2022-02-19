import { NzMessageService } from 'ng-zorro-antd/message';
import { SectionManagerCachedContentService  } from '@core/services/section-manager-cached-content.service';
import { getRandomChars } from '@utils';
import { CacheToken, CacheGroup, StorageTokenValue, SectionNames } from '@core/core-types';
import { ThemeManagerService } from './theme-manager.service';
import { StorageGroup, StorageSectionContentManager, StorageToken, StorageTokensManager } from '../storages/storages-types';
import { ClipboardService } from '../services/clipboard.service';
import { Inject, Injectable } from '@angular/core';
import { deepClone } from '@utils/deep-clone';

@Injectable()
export default class SectionManagerTokensService<T extends StorageToken = any, G extends StorageGroup = any> {
  protected sectionName: SectionNames;
  storage: StorageTokensManager<T>

  get selectedThemeId() {
    return this.theme.selected.id;
  }

  constructor(
    @Inject('storage') storageSection: StorageSectionContentManager<T, G>,
    protected cache: SectionManagerCachedContentService ,
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

  async addToGroup(group: CacheGroup<G, T>, token = this.create(group)) {
    return this.add(token, group.tokens);
  }

  async addToContainer(token: T, container: any[]) {
    return this.add(token, container);
  }

  async add(token: T, container: any[]) {
    const tokenId = await this.storage.add(token);
    if (tokenId) {
      const newToken = {id: tokenId, ...token};
      this.addToCache(newToken, container)
      return newToken;
    }
  }

  async delete(token: CacheToken<T>, group: CacheGroup<G, T>) {
    await this.storage.delete(token.id);
    this.cache.deleteToken(this.sectionName, group, token.id)
  }

  async rename(tokenName: string, token: CacheToken<T>) {
    const isUnique = await this.theme.isTokenNameUnique(tokenName);
    if (!isUnique) {
      this.message.error('The token name must be unique');
      return;
    }

    await this.storage.update(token.id, {name: tokenName});

    token.name = tokenName
  }

  getDefaultValue(group?: CacheGroup<G, T>): any {
    return {}
  }

  getStyleValue(token: T, group?: G): any {
    return "";
  }

  addCustomIterator(tokens: T[]): T[] {
    return tokens;
  }

  create(
    group: CacheGroup<G, T>,
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
    token: CacheToken<T>,
    changes: Partial<StorageTokenValue<T>>,
    updateCache = true,
  ) {
    const keys = Object.keys(changes);

    for (let key of keys) {
      await this.storage.update(token.id, changes);

      if (updateCache) {
        token[key] = changes[key];
      }
    }
  }

  addToCache(token: T, container: any[]) {
    container.push(token);
  }

  getCachedList(): CacheToken<T>[] {
    return this.cache.getSectionTokens(this.sectionName)
  }

  getFromCache(tokenId: number): CacheToken<T> | false {
    return this.cache.getSectionToken(this.sectionName, tokenId)
  }

  async copy(content: T) {
    this.clipboard.copyText(JSON.stringify({
      section: this.sectionName,
      content,
      type: 'token'
    }));
  }

  async past(group: CacheGroup<G, T>) {
    try {
      const data = await this.clipboard.getCopiedData();
      if (this.canPast(data)) {

        await this.duplicate(data.content, group)
        this.message.success('Done');
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  }

  duplicate(token: CacheToken<T>, group: CacheGroup<G, T>) {
    const duplicate = this.getDuplicate(token, group);
    return this.addToGroup(group, duplicate);
  }

  protected canPast(copiedData: any) {
    if (copiedData.type !== "token" || copiedData.section !== this.sectionName) return false;
    return true;
  }

  protected getDuplicate(originalToken: T, group: CacheGroup<G, T>): T {
    const duplicate = deepClone(originalToken);
    const tokenName = `${duplicate.name}-${getRandomChars(4)}`;
    delete duplicate.id;

    return {
      ...duplicate,
      ...this.create(group, {}, tokenName)
    };
  }
}