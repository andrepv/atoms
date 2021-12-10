import { NzMessageService } from "ng-zorro-antd/message";
import { getRandomChars } from "@utils";
import { SectionContentManagerService } from "./section-content-manager.service";
import { SectionNames, StoreGroup, DBGroup, DBToken, StoreToken } from "@core/core.model";
import { Injectable } from "@angular/core";

interface CopiedContent<T> {
  section: SectionNames;
  content: T;
  type: 'token' | 'group'
}

@Injectable()
export class ClipboardService<T extends DBToken = any, G extends DBGroup = any> {
  static canUseClipboard = true;

  get isAvailable() {
    return ClipboardService.canUseClipboard;
  }

  constructor(
    private contentManager: SectionContentManagerService<T, G>,
    private message: NzMessageService,
  ) {}

  async pastToken(group: StoreGroup) {
    try {
      const data: CopiedContent<T> = await this.getCopiedData();
      if (data.type !== "token") return;

      if (data.section === this.contentManager.sectionName) {
        await this.addToken(data.content, group);
        this.message.success('Done');
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  }

  async pastGroup() {
    const id = this.message.loading('Action in progress..').messageId;
    try {
      const data: CopiedContent<any> = await this.getCopiedData();

      if (data.type !== "group") {
        this.message.remove(id);
        return;
      }

      if (data.section === this.contentManager.sectionName) {

        const copiedGroup = data.content;
        const groupDuplicate = this.getGroupDuplicate(copiedGroup)

        const groupId = await this.contentManager.addGroup(groupDuplicate);
        const group = this.contentManager.getGroup(groupId)

        for (let token of copiedGroup.tokens) {
          await this.addToken(token, group)
        }
        this.message.success('Done');
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    } finally {
      this.message.remove(id);
    }
  }

  async copy(content: T | G, type: CopiedContent<T>['type']) {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify({
          section: this.contentManager.sectionName,
          content,
          type
        })
      );
      this.message.info('Content copied to clipboard');
    } catch (err) {
      this.message.error('Failed to copy');
    }
  }

  private async getCopiedData() {
    const text = await navigator.clipboard.readText();
    return JSON.parse(text);
  }

  private async addToken(copiedToken: T, group: StoreGroup) {
    const duplicate = this.getTokenDuplicate({...copiedToken}, group)
    this.contentManager.hooks.onTokenPast(duplicate, copiedToken, group);
    await this.contentManager.addToken(duplicate, group);
    return duplicate;
  }

  private getTokenDuplicate(token: T, group: StoreGroup) {
    const tokenName = `${token.name}-${getRandomChars(4)}`;
    delete token.id;
    this.contentManager.hooks.onCreateTokenDuplicate(token);
    return {
      ...token,
      ...this.contentManager.createToken(group.id, tokenName)
    };
  }

  private getGroupDuplicate(group: StoreGroup) {
    const groupDuplicate = {...group}

    delete groupDuplicate.id;
    delete groupDuplicate.tokens;
    delete groupDuplicate.anchorLink;

    return {
      ...groupDuplicate,
      ...this.contentManager.createGroup(groupDuplicate.name)
    }
  }
}