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
        await this.deleteGroup(group.id, themeId);
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

  deleteGroup(groupId: number, themeId: number) {
    return this.db.transaction('rw', [this.tokenTable, this.groupTable], async () => {
      const group = await this.getGroup(groupId);
      await this.groupTable.delete(group.id);

      const tokens = await this.getThemeTokens(themeId);

      for (let token of tokens) {
        if (token.groupId === groupId) {
          await this.tokenTable.delete(token.id);
        }
      }
    });
  }

  private getGroup(id: number) {
    return this.groupTable.where('id').equals(id).first();
  }
}