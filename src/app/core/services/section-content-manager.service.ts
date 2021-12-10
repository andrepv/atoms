import { Inject, Injectable, TemplateRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { db } from '../indexedDB';
import { StoreService } from '@core/services/store.service';
import { EditorService } from '@core/services/editor.service';
import { getRandomChars } from '@utils';
import { StoreToken, StoreGroup, DBToken, DBGroup } from '@core/core.model';
import { ThemeManagerService } from './theme-manager.service';
import { SectionTables } from '@core/section-tables';

interface SectionViewConfigs {}

interface SectionContentManagerHooks<T extends DBToken, G extends DBGroup> {
  onLoad: () => void;
  onTokenDelete: (token: StoreToken<T>, group: StoreGroup<G, T>) => void;
  onTokenAdd: (token: StoreToken<T>, group: StoreGroup<G, T>) => void;

  getDefaultToken: (groupId: number) => Omit<T, 'name' | 'value' | 'groupId' | 'themeId'> | void;
  getDefaultGroup: () => Omit<G, 'name' | 'tokensId' | 'themeId'> | void;
  onTokenUpdate:  (value: {[key: string]: any}, token: StoreToken<T>, group: StoreGroup<G, T>) => void;

  onCreateTokenDuplicate: (token: any) => void;
  onTokenPast: (token: any, copiedToken: any,  group: StoreGroup) => void;
}

@Injectable()
export class SectionContentManagerService<T extends DBToken = any, G extends DBGroup = any> {
  isLoading = false;

  get groupTable() {
    return this.tables.groupTable;
  }

  get tokenTable() {
    return this.tables.tokenTable;
  }

  get sectionName() {
    return this.tables.name;
  }

  get selectedThemeId() {
    return this.themeManager.selected.id;
  }

  hooks: SectionContentManagerHooks<T, G> = {
    onLoad: () => {},
    onTokenDelete: () => {},
    onTokenAdd: () => {},
    onTokenUpdate: () => {},
    onCreateTokenDuplicate: () => {},
    onTokenPast: () => {},
    getDefaultToken: () => {},
    getDefaultGroup: () => {},
  }

  sectionViewConfigs: SectionViewConfigs = {}

  constructor(
    @Inject('tables') public tables: SectionTables<T, G>,
    public store: StoreService,
    private message: NzMessageService,
    private themeManager: ThemeManagerService,
  ) {}

  configure({ hooks, sectionViewConfigs }: {
    hooks: Partial<SectionContentManagerHooks<T, G>>,
    sectionViewConfigs?: SectionViewConfigs
  }) {
    this.hooks = Object.assign(this.hooks, hooks);
    this.sectionViewConfigs = Object.assign(this.sectionViewConfigs, sectionViewConfigs)
  }

  async load() {
    this.isLoading = true;

    let groups = await this.tables.getThemeGroups(this.selectedThemeId) as any;

    if (groups.length) {
      for (let group of groups) {
        const tokens = await this.tokenTable.where("groupId").equals(group.id).toArray();

        group.tokens = tokens;
        group.anchorLink = getRandomChars();
      }
    }

    this.store.setSectionContent(this.sectionName, groups)
    this.isLoading = false;
    this.hooks.onLoad();
  }

  async addToken(token: T, group: StoreGroup, listToAdd = group.tokens) {
    const tokenId = await this.tokenTable.add(token);
    if (tokenId) {
      const newToken = {id: tokenId, ...token};
      this.hooks.onTokenAdd(newToken, group);
      listToAdd.push(newToken);
      return newToken;
    }
  }

  async deleteToken(token: StoreToken, group: StoreGroup) {
    await this.tokenTable.delete(token.id)
    this.hooks.onTokenDelete(token, group);
    this.store.deleteToken(this.sectionName, group, token.id)
  }

  async renameToken(tokenName: string, token: StoreToken) {
    const isUnique = await db.isTokenNameUnique(tokenName, this.selectedThemeId);
    if (!isUnique) {
      this.message.error('The token name must be unique');
      return;
    }

    await this.tokenTable.update(token.id, {name: tokenName});

    token.name = tokenName
  }

  createToken(
    groupId: number,
    name = `token-${getRandomChars()}`
  ) {
    return {
      name,
      groupId,
      themeId: this.selectedThemeId,
    } as T;
  }

  async updateToken(token: any, group: any, changes: {[key: string]: any}) {
    const key = Object.keys(changes)[0];

    await this.tokenTable.update(token.id, changes);
    token[key] = changes[key];
    this.hooks.onTokenUpdate(changes, token, group);
  }

  getTokens(): StoreToken<T>[] {
    return this.store.getSectionTokens(this.sectionName)
  }

  getToken(tokenId: number): StoreToken<T> | false {
    return this.store.getSectionToken(this.sectionName, tokenId)
  }

  async addGroup(group: G) {
    const groupId: number = await this.groupTable.add(group);
    const newGroup: StoreGroup<G, T> = {
      ...group,
      id: groupId,
      tokens: [],
      anchorLink: getRandomChars(),
    }
    this.store.addGroup(this.sectionName, newGroup)
    return groupId;
  }

  async deleteGroup(group: StoreGroup) {
    await this.tables.deleteGroup(group.id, this.selectedThemeId);

    for (let token of group.tokens) {
      this.hooks.onTokenDelete(token, group);
    }

    this.store.deleteGroup(this.sectionName, group.id);
  }

  async renameGroup(groupName: string, group: StoreGroup) {
    await this.groupTable.update(group.id, {name: groupName});
    group.name = groupName
  }

  createGroup(name = "group") {
    return {
      name,
      themeId: this.selectedThemeId,
    } as G;
  }

  async updateGroup(group: any, changes: {[key: string]: any}) {
    const key = Object.keys(changes)[0];
    await this.groupTable.update(group.id, changes);
    this.store.getGroup(this.sectionName, group.id)[key] = changes[key]
    this.store.updateGroup(group, this.sectionName);
  }

  getGroup(groupId: number): StoreGroup<G, T> {
    return this.store.getGroup(this.sectionName, groupId);
  }

  getGroupList(): StoreGroup<G, T>[] {
    return this.store.getGroupList(this.sectionName)
  }
}
