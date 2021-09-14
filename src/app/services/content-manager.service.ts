import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Table, ITables, TokenGroupModel, TokenModel, db } from './db.service';
import { StoreService, Token } from './store.service';

@Injectable()
export class ContentManagerService<T extends Table, G extends Table> {
  isLoading = false;
  subscription: Subscription;
  addTokenLoading = false;
  addGroupLoading = false;

  get groupTable() {
    return this.tables.group;
  }

  get tokenTable() {
    return this.tables.token;
  }

  get sectionName() {
    return this.tables.name;
  }

  constructor(
    private tables: ITables<T, G>,
    private store: StoreService,
  ) {
    this.subscription = store.themeManager.selected$.subscribe(() => this.load())
  }

  async load() {
    this.isLoading = true;

    const groups = await this.groupTable
    .where("themeId")
    .equals(this.store.themeManager.selected.id)
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
        anchorLink: this.getAnchorLink(),
      })
    }

    this.store.setGroupList(this.sectionName, groupList)

    this.isLoading = false;
  }

  async addToken<T>(token: TokenModel<T>, groupId: number) {
    this.addTokenLoading = true;
    try {
      const newToken = await this.saveTokenToDB(token, groupId);
      this.store.updateGroup(this.sectionName, groupId,
        group => group.tokens.push(newToken)
      );
    } finally {
      this.addTokenLoading = false;
    }
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

  async addGroup(group: TokenGroupModel) {
    this.addGroupLoading = true;
    try {
      const groupId = await this.groupTable.add(group);
      const newGroup = {
        id: groupId,
        name: group.name,
        tokens: [],
        anchorLink: this.getAnchorLink(),
      }
      this.store.addGroup(this.sectionName, newGroup)
    } finally {
      this.addGroupLoading = false;
    }
  }

  deleteGroup(groupId: number) {
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

  private async saveTokenToDB<T>(token: TokenModel<T>, groupId: number) {
    return db.transaction('rw', [this.tokenTable, this.groupTable], async () => {
      const tokenId = await this.tokenTable.add(token);
      const tokenIds = this.store.getGroupTokenIds(this.sectionName, groupId);
      const nextTokenIds = [...tokenIds, tokenId]
      await this.groupTable.update(groupId, {tokensId: nextTokenIds});
      return {id: tokenId, name: token.name, value: token.value} as Token<T>;
    });
  }

  private getAnchorLink() {
    let res = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 10; i++ ) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      res += characters.charAt(randomIndex);
    }
    return res;
  }
}
