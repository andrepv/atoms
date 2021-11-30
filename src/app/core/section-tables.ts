import { DBGroup, DBToken, SectionNames, TokensByTheme } from "./core.model";
import { DBService } from "./indexedDB";

export class SectionTables<T extends DBToken, G extends DBGroup> {
  constructor(
    public name: SectionNames,
    public tokenTable: Dexie.Table<T, number>,
    public groupTable: Dexie.Table<G, number>,
    private db: DBService,
  ) {}

  deleteData(themeId: number) {
    return this.db.transaction('rw', [this.tokenTable, this.groupTable], async () => {
      const groups = await this.getThemeGroups(themeId);

      for (let group of groups) {
        await this.deleteGroup(group);
      }
    })
  }

  async isTokenNameUnique(name: string, themeId: number) {
    const res = await this.tokenTable
    .where("name").equalsIgnoreCase(name)
    .and(token => token.themeId === themeId).toArray();
    return !Boolean(res.length);
  }

  getThemeTokens(themeId: number) {
    return this.tokenTable.where("themeId").equals(themeId).toArray()
  }
  
  getThemeGroups(themeId: number) {
    return this.groupTable.where("themeId").equals(themeId).toArray()
  }

  getTokensByIds(ids: number[]) {
    return this.tokenTable.where("id").anyOf(ids).toArray()
  }

  async getTokens(excludeThemeIds = []) {
    const tokens = await this.tokenTable.toArray();
    const themes = await this.db.theme.toArray();
    const data: TokensByTheme<T> = [];

    for (let theme of themes) {
      if (!excludeThemeIds.includes(theme.id)) {
        const themeTokens = tokens.filter(token => token.themeId === theme.id);
        if (themeTokens.length) {
          data.push({themeName: theme.name, tokens: themeTokens})
        }
      }
    }

    return data;
  }

  async addToken(token: T, group: G) {
    return this.db.transaction('rw', [this.tokenTable, this.groupTable], async () => {
      const tokenId = await this.tokenTable.add(token);
      await this.groupTable.update(group.id, {tokensId: [...group.tokensId, tokenId]});
      return tokenId;
    });
  }

  deleteToken(tokenId: number, group: G) {
    return this.db.transaction('rw', [this.tokenTable, this.groupTable], async () => {
      await this.tokenTable.delete(tokenId);

      await this.groupTable.update(group.id, {
        tokensId: group.tokensId.filter(id => id !== tokenId)
      });
    });
  }

  deleteGroup(group: G) {
    return this.db.transaction('rw', [this.tokenTable, this.groupTable], async () => {
      await this.groupTable.delete(group.id);

      for (let tokenId of group.tokensId) {
        await this.tokenTable.delete(tokenId);
      }
    });
  }
}