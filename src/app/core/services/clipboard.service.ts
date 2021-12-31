import { NzMessageService } from "ng-zorro-antd/message";
import { getRandomChars } from "@utils";
import { SectionContentManagerService } from "./section-content-manager.service";
import { SectionNames, StoreGroup, DBGroup, DBToken, StoreToken } from "@core/core.model";
import { Injectable, Optional } from "@angular/core";

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
    @Optional() private contentManager: SectionContentManagerService<T, G>,
    private message: NzMessageService,
  ) {}

  async pastToken(group: StoreGroup<G, T>) {
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
      const data: CopiedContent<StoreGroup<G, T>> = await this.getCopiedData();

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

  async copy(content: T | StoreGroup<G, T>, type: CopiedContent<T>['type']) {
    this.copyText(JSON.stringify({
      section: this.contentManager.sectionName,
      content,
      type
    }));
  }

  duplicateToken(token: StoreToken<T>, group: StoreGroup<G, T>) {
    return this.addToken(token, group);
  }

  async duplicateGroup(group: StoreGroup<G, T>) {
    const groupDuplicate = this.getGroupDuplicate(group)

    const groupId = await this.contentManager.addGroup(groupDuplicate);
    const storeGroup = this.contentManager.getGroup(groupId)

    for (let token of group.tokens) {
      await this.addToken(token, storeGroup)
    }
  }

  async copyText(text: string) {
    if (!navigator.clipboard) {
      this.fallbackCopyText(text);
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      this.message.info('Copied');
    } catch (err) {
      this.message.info('Failed to copy');
    }
  }

  private async getCopiedData() {
    const text = await navigator.clipboard.readText();
    return JSON.parse(text);
  }

  private async addToken(copiedToken: T, group: StoreGroup<G, T>) {
    const duplicate = this.getTokenDuplicate({...copiedToken}, group)
    await this.contentManager.addToken(duplicate, group);
    return duplicate;
  }

  private getTokenDuplicate(token: T, group: StoreGroup<G, T>): T {
    const tokenName = `${token.name}-${getRandomChars(4)}`;
    delete token.id;
    this.contentManager.hooks.onCreateTokenDuplicate(token);
    return {
      ...token,
      ...this.contentManager.createToken(group.id, tokenName)
    };
  }

  private getGroupDuplicate(group: StoreGroup<G, T>): G {
    const groupDuplicate = {...group}

    delete groupDuplicate.id;
    delete groupDuplicate.tokens;

    return {
      ...groupDuplicate,
      ...this.contentManager.createGroup(groupDuplicate.name)
    }
  }

  private fallbackCopyText(text: string) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
  
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    try {
      document.execCommand('copy');
      this.message.info('Copied');
    } catch (err) {
      this.message.info('Failed to copy');
    }
  
    document.body.removeChild(textArea);
  }
}