import { Inject, Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { db } from '../indexedDB';
import { StoreService } from '@core/services/store.service';
import { EditorService } from '@core/services/editor.service';
import { getRandomChars } from '@utils';
import { StoreToken, StoreGroup, DBToken, DBGroup } from '@core/core.model';
import { ThemeManagerService } from './theme-manager.service';
import { SectionTables } from '@core/section-tables';

interface SectionViewConfigs {
  isTokenEditable?: boolean;
  isGroupEditable?: boolean;
}

interface ConfigureOptions<T extends DBToken, G extends DBGroup> {
  onLoad: () => void;
  onTokenDelete: (token: StoreToken<T>, group: StoreGroup<G, T>) => void;
  onTokenValueChange: (value: T['value'], token: StoreToken<T>, group: StoreGroup<G, T>) => void;
  getDefaultTokenValue: (groupId: number) => T['value'];
  getDefaultGroupState: () => G['state'];
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

  configs: ConfigureOptions<T, G> = {
    onLoad: () => {},
    onTokenDelete: () => {},
    onTokenValueChange: () => {},
    getDefaultTokenValue: () => "",
    getDefaultGroupState: () => false,
  }

  sectionViewConfigs: SectionViewConfigs = {
    isTokenEditable: true,
    isGroupEditable: false,
  }

  constructor(
    @Inject('tables') public tables: SectionTables<T, G>,
    public store: StoreService,
    private message: NzMessageService,
    private editor: EditorService,
    private themeManager: ThemeManagerService,
  ) {}

  configure({
    contentManagerConfigs,
    sectionViewConfigs,
  }: {
    contentManagerConfigs: Partial<ConfigureOptions<T, G>>, // ???
    sectionViewConfigs?: SectionViewConfigs
  }) {
    this.configs = Object.assign(this.configs, contentManagerConfigs);
    this.sectionViewConfigs = Object.assign(this.sectionViewConfigs, sectionViewConfigs)
  }

  async load() {
    this.isLoading = true;

    const groups = await this.tables.getThemeGroups(this.selectedThemeId);

    if (!groups.length) {
      this.store.setSectionContent(this.sectionName, [])
      this.isLoading = false;
      this.configs.onLoad();
      return;
    }

    let groupList: StoreGroup[] = [];

    for (let group of groups) {
      const tokens = await this.tables.getTokensByIds(group.tokensId) as StoreToken[];

      const transformedGroup: StoreGroup = {
        name: group.name,
        id: group.id,
        tokens,
        anchorLink: getRandomChars(),
      }

      if (group.state) {
        transformedGroup.state = group.state;
      }

      groupList.push(transformedGroup)
    }

    this.store.setSectionContent(this.sectionName, groupList)

    this.isLoading = false;

    this.configs.onLoad();
  }

  async addToken(token: T, groupId: number) {
    const tokenId = await this.tables.addToken(token, this.getDBGroup(groupId));
    if (tokenId) {
      const newToken = {id: tokenId, ...token};
      this.store.getGroup(this.sectionName, groupId).tokens.push(newToken)
      return newToken;
    }
  }

  async deleteToken(tokenId: number, groupId: number) {
    await this.tables.deleteToken(tokenId, this.getDBGroup(groupId));

    const group = this.store.getGroup(this.sectionName, groupId);
    const token = group.tokens.find(({id}) => id === tokenId);

    if (token) {
      this.configs.onTokenDelete(token, group);
    }

    if (this.editor.isTokenEditable(tokenId, this.sectionName)) {
      this.editor.disable();
    }

    group.tokens = group.tokens.filter(({id}) => id !== tokenId)
  }

  async renameToken(tokenName: string, tokenId: number, groupId: number) {
    const isUnique = await db.isTokenNameUnique(tokenName, this.selectedThemeId);
    if (!isUnique) {
      this.message.error('The token name must be unique');
      return;
    }

    await this.tokenTable.update(tokenId, {name: tokenName});

    this.store.getGroupToken(this.sectionName, groupId, tokenId).name = tokenName
  }

  createToken(
    groupId: number,
    value = this.configs.getDefaultTokenValue(groupId),
    name = `token-${getRandomChars()}`
  ): T {
    const token = {
      name,
      value,
      groupId,
      themeId: this.selectedThemeId,
    };
    return token as T;
  }

  async setTokenValue(value: T['value'], tokenId: number, groupId: number) {
    await this.tokenTable.update(tokenId, {value});

    const group = this.store.getGroup(this.sectionName, groupId);
    const token = this.store.getGroupToken(this.sectionName, groupId, tokenId);

    token.value = value;
    this.configs.onTokenValueChange(value, token, group);

    // ???
    if (this.editor.isTokenEditable(tokenId, this.sectionName)) {
      const {token, group} = this.editor.content;
      this.editor.content = {token: {...token, value: value},group }
    }
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
      id: groupId,
      name: group.name,
      tokens: [],
      anchorLink: getRandomChars(),
    }

    if (group.state) newGroup.state = group.state;

    this.store.addGroup(this.sectionName, newGroup)
    return groupId;
  }

  async deleteGroup(groupId: number) {
    await this.tables.deleteGroup(this.getDBGroup(groupId));

    const group = this.store.getGroup(this.sectionName, groupId);

    for (let token of group.tokens) {
      this.configs.onTokenDelete(token, group);
    }

    this.store.deleteGroup(this.sectionName, groupId);
  }

  async renameGroup(groupName: string, groupId: number) {
    await this.groupTable.update(groupId, {name: groupName});
    this.store.getGroup(this.sectionName, groupId).name = groupName
  }

  async setGroupState(
    groupId: number,
    stateChunk: Partial<G['state']>
  ) {
    const group = this.store.getGroup(this.sectionName, groupId);
    const prevState = group.state || {};
    const nextState = {...prevState, ...stateChunk};

    await this.groupTable.update(groupId, {state: nextState});

    group.state = nextState;

    this.store.updateGroup(group, this.sectionName);
  }

  createGroup(
    name = "group",
    state = this.configs.getDefaultGroupState(),
    tokensId = []
  ) {
    const group = {
      name,
      themeId: this.selectedThemeId,
      tokensId,
    } as G;

    if (state) {
      group.state = state;
    }

    return group;
  }

  getGroup(groupId: number): StoreGroup<G, T> {
    return this.store.getGroup(this.sectionName, groupId);
  }

  getGroupList(): StoreGroup<G, T>[] {
    return this.store.getGroupList(this.sectionName)
  }

  private getDBGroup(groupId: number): any {
    const group = this.store.getGroup(this.sectionName, groupId)
    return {
      ...group,
      tokensId: group.tokens.map(token => token.id),
      themeId: this.themeManager.selected.id,
    }
  }
}
