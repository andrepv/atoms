import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { Table, ITables, TokenGroupModel, TokenModel, db } from './db.service';
import { StoreService, Token } from './store.service';
import {Clipboard} from "./clipboard";


@Injectable()
export class ContentManagerService<T extends Table = any, G extends Table = any> {
  isLoading = false;
  subscription: Subscription;
  addGroupLoading = false;
  clipboard = new Clipboard(this, this.message)

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

  constructor(
    private tables: ITables<T, G>,
    public store: StoreService,
    private message: NzMessageService,
  ) {
    this.subscription = store.themeManager.selected$.subscribe(() => this.load())
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

      groupList.push({
        name: group.name,
        id: group.id,
        tokens,
        anchorLink: this.getRandomChars(),
      })
    }

    this.store.setGroupList(this.sectionName, groupList)

    this.isLoading = false;
  }

  async addToken<T>(token: TokenModel<T>, groupId: number) {
    const newToken = await this.saveTokenToDB(token, groupId);
    this.store.updateGroup(this.sectionName, groupId,
      group => group.tokens.push(newToken)
    );
  }

  deleteToken(tokenId: number, groupId: number) {
    db.transaction('rw', [this.tokenTable, this.groupTable], async () => {
        await this.tokenTable.delete(tokenId);
    
        const tokenIds = this.store.getGroupTokenIds(this.sectionName, groupId);
        const nextTokenIds = tokenIds.filter(id => id !== tokenId)
    
        await this.groupTable.update(groupId, {tokensId: nextTokenIds})
    
      }).then(() => {
        this.store.updateGroup(this.sectionName, groupId,
          group => (
            group.tokens = group.tokens.filter(({id}) => id !== tokenId)
          )
        );
    });
  }

  async renameToken(tokenName: string, tokenId: number, groupId: number) {
    const isUnique = await this.isTokenNameUnique(tokenName);
    if (!isUnique) {
      this.message.error('The token name must be unique');
      return;
    }

    await this.tokenTable.update(tokenId, {name: tokenName});

    this.store.updateGroup(
      this.sectionName,
      groupId,
      group => group.tokens.map(token => {
        if (token.id === tokenId) {
          token.name = tokenName;
        }
        return token;
      }),
    );
  }

  createToken<T>(
    groupId: number,
    value: T,
    name = `token-${this.getRandomChars()}`
  ) {
    return {
      name,
      value,
      groupId,
      themeId: this.selectedThemeId,
    } as TokenModel<T>;
  }

  async addGroup(group: TokenGroupModel) {
    this.addGroupLoading = true;
    try {
      const groupId: number = await this.groupTable.add(group);
      const newGroup = {
        id: groupId,
        name: group.name,
        tokens: [],
        anchorLink: this.getRandomChars(),
      }
      this.store.addGroup(this.sectionName, newGroup)
      return groupId;
    } finally {
      this.addGroupLoading = false;
    }
  }

  deleteGroup(groupId: number) {
    if (this.store.isGroupEditable(groupId)) {
      this.store.deactivateEditor();
    }
    db.transaction('rw', [this.tokenTable, this.groupTable], async () => {
      const tokenIds = this.store.getGroupTokenIds(this.sectionName, groupId);

      await this.groupTable.delete(groupId);

      for (let tokenId of tokenIds) {
        await this.tokenTable.delete(tokenId);
      }
      this.store.deleteGroup(this.sectionName, groupId);
    });
  }

  async renameGroup(groupName: string, groupId: number) {
    await this.groupTable.update(groupId, {name: groupName});

    this.store.updateGroup(this.sectionName, groupId,
      group => group.name = groupName,
    );
  }

  createGroup(name = "group", tokensId = []) {
    return {
      name,
      themeId: this.selectedThemeId,
      tokensId,
    } as TokenGroupModel
  }

  getRandomChars(length = 10) {
    let res = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++ ) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      res += characters.charAt(randomIndex);
    }
    return res;
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
