import { NzMessageService } from "ng-zorro-antd/message";
import { ContentManagerService } from "./content-manager.service";
import { TokenGroupModel, TokenModel } from "./db.service";
import { SectionNames, StoreService, TokenGroup } from "./store.service";

interface CopiedContent<T> {
  section: SectionNames;
  content: T
}

export class Clipboard {
  store: StoreService;

  constructor(
    private contentManager: ContentManagerService,
    private message: NzMessageService,
  ) {
    this.store = contentManager.store;
  }

  copyToken<T>(token: TokenModel<T>) {
    this.store.copiedTokenSection = this.contentManager.sectionName;
    const content = {section: this.store.copiedTokenSection, content: token}
    return this.copyContent(content)
  }

  copyGroup(group: TokenGroupModel) {
    this.store.copiedGroupSection = this.contentManager.sectionName;
    const content = {section: this.store.copiedGroupSection, content: group}
    return this.copyContent(content)
  }

  async pastToken(groupId: number) {
    try {
      const data: CopiedContent<any> = await this.getCopiedData();
      if (data.section === this.contentManager.sectionName) {
        let {value, name} = data.content;
        name = `${name}-${this.contentManager.getRandomChars(4)}`;
        const token = this.contentManager.createToken(groupId, value, name);
        await this.contentManager.addToken<any>(token, groupId);
        this.message.success('Done');
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  }

  async pastGroup() {
    const id = this.message.loading('Action in progress..').messageId;
    try {
      const data: CopiedContent<TokenGroup> = await this.getCopiedData();
      if (data.section === this.contentManager.sectionName) {
        const {name, tokens} = data.content;

        const group = this.contentManager.createGroup(name);
        const groupId = await this.contentManager.addGroup(group);

        for (let token of tokens) {
          token.name = `${token.name}-${this.contentManager.getRandomChars(4)}`;
          const newToken = this.contentManager.createToken(groupId, token.value, token.name);
          await this.contentManager.addToken<any>(newToken, groupId);
        }
        this.message.success('Done');
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    } finally {
      this.message.remove(id);
    }
  }

  private async copyContent<T>(content: CopiedContent<T>) {
    try {
      await navigator.clipboard.writeText(JSON.stringify(content));
      this.message.info('Content copied to clipboard');
    } catch (err) {
      this.message.error('Failed to copy');
    }
  }

  private async getCopiedData() {
    const text = await navigator.clipboard.readText();
    return JSON.parse(text);
  }
}