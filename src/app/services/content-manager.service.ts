import { Inject, Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { Table, ITables, TokenGroupModel, TokenModel, db } from './db.service';
import { StoreService, Token, TokenGroup } from './store.service';
import {Clipboard} from "./clipboard";
import { getRandomChars } from '../utils/get-random-chars';
import { EditorService } from '../layout/editor/editor.service';

type SectionViewConfigs = {
  isTokenEditable?: boolean;
  isGroupEditable?: boolean;
}

interface ConfigureOptions {
  onLoad: () => any;
  getDefaultTokenValue: (groupId: number) => any;
  getDefaultGroupState: () => any;
  onTokenDelete: (token: Token, group: TokenGroup) => any;
}

@Injectable()
export class ContentManagerService<T extends Table = any, G extends Table = any> {
  isLoading = false;
  subscription: Subscription;
  clipboard = new Clipboard(this, this.message);

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

  configs: ConfigureOptions = {
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
    @Inject('tables') private tables: ITables<T, G>,
    public store: StoreService,
    private message: NzMessageService,
    private editor: EditorService,
  ) {
    this.subscription = store.themeManager.selected$.subscribe(() => this.load())
  }

  configure({
    contentManagerConfigs,
    sectionViewConfigs,
  }: {
    contentManagerConfigs: Partial<ConfigureOptions>,
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
      .toArray();

      const transformedGroup: TokenGroup = {
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

  async addToken(token: TokenModel, groupId: number) {
    const newToken = await this.saveTokenToDB(token, groupId);
    this.store.updateGroup(this.sectionName, groupId,
      group => group.tokens.push(newToken)
    );
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
  ) {
    return {
      name,
      value,
      groupId,
      themeId: this.selectedThemeId,
    } as TokenModel;
  }

  async addGroup(group: TokenGroupModel) {
    const groupId: number = await this.groupTable.add(group);
    const newGroup: TokenGroup = {
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

  async setGroupState(groupId: number, state: {[key: string]: any}) {
    const group = this.store.getGroup(this.sectionName, groupId);
    const prevState = group.state || {};
    const nextState = {...prevState, ...state};

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
    } as TokenGroupModel;

    if (state) {
      group.state = state;
    }

    return group;
  }

  async setTokenValue(value: any, tokenId: number, groupId: number) {
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

  private async saveTokenToDB<T>(token: TokenModel<T>, groupId: number): Promise<Token<T>>
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
