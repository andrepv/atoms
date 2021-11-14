import { Inject, Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { db } from '../indexedDB';
import { StoreService } from '@core/services/store.service';
import { EditorService } from '@core/services/editor.service';
import { getRandomChars } from '@utils';
import { StoreToken, StoreGroup, DBToken, DBTables, DBGroup, TokensByTheme } from '@core/core.model';
import { ThemeManagerService } from './theme-manager.service';

interface SectionViewConfigs {
  isTokenEditable?: boolean;
  isGroupEditable?: boolean;
}

interface ConfigureOptions<T extends DBToken, G extends DBGroup> {
  onLoad: () => void;
  getDefaultTokenValue: (groupId: number) => T['value'];
  getDefaultGroupState: () => G['state'];
  onTokenDelete: (token: StoreToken<T>, group: StoreGroup<G, T>) => void;
}

@Injectable()
export class SectionContentManagerService<T extends DBToken = any, G extends DBGroup = any> {
  isLoading = false;
  subscription: Subscription;

  get groupTable() {
    return this.tables.group;
  }

  get tokenTable() {
    return this.tables.token;
  }

  get sectionName() {
    return this.tables.name;
  }

  get selectedThemeId() {
    return this.store.themeManager.selected.id;
  }

  configs: ConfigureOptions<T, G> = {
    onLoad: () => {},
    onTokenDelete: () => {},
    getDefaultTokenValue: () => "",
    getDefaultGroupState: () => false,
  }

  sectionViewConfigs: SectionViewConfigs = {
    isTokenEditable: true,
    isGroupEditable: false,
  }

  constructor(
    @Inject('tables') private tables: DBTables<Dexie.Table<T, number>, Dexie.Table<G, number>>,
    public store: StoreService,
    private message: NzMessageService,
    private editor: EditorService,
    private themeManager: ThemeManagerService,
  ) {
    this.subscription = store.themeManager.selected$.subscribe(() => this.load())
  }

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

    const groups = await this.groupTable
    .where("themeId")
    .equals(this.selectedThemeId)
    .toArray();

    if (!groups.length) {
      this.store.setGroupList(this.sectionName, [])
      this.isLoading = false;
      return;
    }

    let groupList = [];

    for (let group of groups) {
      const tokens = await this.tokenTable
      .where("id")
      .anyOf(group.tokensId)
      .toArray() as StoreToken[];

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

    this.store.setGroupList(this.sectionName, groupList)

    this.isLoading = false;

    this.configs.onLoad();
  }

  async addToken(token: T, groupId: number) {
    const newToken = await this.saveTokenToDB(token, groupId);
    this.store.updateGroup(this.sectionName, groupId,
      group => group.tokens.push(newToken)
    );
    return newToken;
  }

  deleteToken(tokenId: number, groupId: number) {
    db.transaction('rw', [this.tokenTable, this.groupTable], async () => {
        await this.tokenTable.delete(tokenId);

        const group = this.store.getGroup(this.sectionName, groupId);
        const token = group.tokens.find(({id}) => id === tokenId);

        const tokenIds = this.store.getGroupTokenIds(this.sectionName, groupId);
        const nextTokenIds = tokenIds.filter(id => id !== tokenId)
    
        await this.groupTable.update(groupId, {tokensId: nextTokenIds});

        if (token) {
          this.configs.onTokenDelete(token, group);
        }
    
      }).then(() => {
        this.store.updateGroup(this.sectionName, groupId,
          group => {
            if (this.editor.isTokenEditable(tokenId, this.sectionName)) {
              this.editor.disable();
            }
            return group.tokens = group.tokens.filter(({id}) => id !== tokenId)
          }
        );
    });
  }

  async renameToken(tokenName: string, tokenId: number, groupId: number) {
    const isUnique = await this.isTokenNameUnique(tokenName);
    if (!isUnique) {
      this.message.error('The token name must be unique');
      throw new Error('The token name must be unique');
    }

    await this.tokenTable.update(tokenId, {name: tokenName});

    this.store.updateGroup(
      this.sectionName,
      groupId,
      group => group.tokens.map(token => {
        if (token.id === tokenId) {
          token.name = tokenName;
          // ???
          if (this.editor.isTokenEditable(tokenId, this.sectionName)) {
            const {token, group} = this.editor.content;
            this.editor.content = {
              token: {name: tokenName, ...token},
              group
            }
          }
        }
        return token;
      }),
    );
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

    this.store.updateGroup(this.sectionName, groupId,
      group => group.tokens.map(token => {
        if (token.id === tokenId) {
          token.value = value;
        
          if (this.editor.isTokenEditable(tokenId, this.sectionName)) {
            const {token, group} = this.editor.content;
            this.editor.content = {token: {...token, value: value},group }
          }
        }
        return token;
      }),
    );
  }

  getTokens(): StoreToken<T>[] {
    return this.store.getSectionTokens(this.sectionName);
  }

  async getTokensByTheme(exclude = [this.themeManager.selected.id]) {
    const tokens = await this.tokenTable.toArray();
    const themes = await this.themeManager.table.toArray();
    const data: TokensByTheme<T> = [];

    for (let theme of themes) {
      if (!exclude.includes(theme.id)) {
        const themeTokens = tokens.filter(token => token.themeId === theme.id);
        if (themeTokens.length) {
          data.push({themeName: theme.name, tokens: themeTokens})
        }
      }
    }

    return data;
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

  deleteGroup(groupId: number) {
    db.transaction('rw', [this.tokenTable, this.groupTable], async () => {
      const tokenIds = this.store.getGroupTokenIds(this.sectionName, groupId);

      await this.groupTable.delete(groupId);

      for (let tokenId of tokenIds) {
        await this.tokenTable.delete(tokenId);
      }
      this.store.deleteGroup(this.sectionName, groupId);

      // if (this.editor.isGroupEditable(groupId, this.sectionName)) {
      //   this.editor.disable();
      // }
    });
  }

  async renameGroup(groupName: string, groupId: number) {
    await this.groupTable.update(groupId, {name: groupName});

    this.store.updateGroup(this.sectionName, groupId,
      group => group.name = groupName,
    );
  }

  async setGroupState(
    groupId: number,
    stateChunk: Partial<G['state']>
  ) {
    const group = this.store.getGroup(this.sectionName, groupId);
    const prevState = group.state || {};
    const nextState = {...prevState, ...stateChunk};

    await this.groupTable.update(groupId, {state: nextState});
    this.store.updateGroup(
      this.sectionName,
      groupId, group => group.state = nextState
    );
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

  private async saveTokenToDB(token: T, groupId: number): Promise<StoreToken<T>>
  {
    return db.transaction('rw', [this.tokenTable, this.groupTable], async () => {
      const tokenId = await this.tokenTable.add(token);
      const tokenIds = this.store.getGroupTokenIds(this.sectionName, groupId);
      const nextTokenIds = [...tokenIds, tokenId]
      await this.groupTable.update(groupId, {tokensId: nextTokenIds});
      return {id: tokenId, ...token};
    });
  }

  private async isTokenNameUnique(name: string) {
    for (let section of db.sections) {
      const isUnique = await section.isTokenNameUnique(name, this.selectedThemeId);
      if (!isUnique) {
        return false;
      }
    }
    return true;
  }
}
