import { NzMessageService } from "ng-zorro-antd/message";
import { getRandomChars } from "@utils";
import { SectionContentManagerService } from "./section-content-manager.service";
import { SectionNames, StoreGroup, DBGroup, DBToken, StoreToken } from "@core/core.model";
import { Injectable } from "@angular/core";

interface CopiedContent<T> {
  section: SectionNames;
  content: T
}

@Injectable()
export class ClipboardService<T extends DBToken = any, G extends DBGroup = any> {
  constructor(
    private contentManager: SectionContentManagerService<T, G>,
    private message: NzMessageService,
  ) {}

  async pastToken(groupId: number) {
    try {
      const data: CopiedContent<StoreToken<T>> = await this.getCopiedData();
      if (data.section === this.contentManager.sectionName) {
        let {value, name} = data.content;
        name = `${name}-${getRandomChars(4)}`;
        const token = this.contentManager.createToken(groupId, value, name);
        await this.contentManager.addToken(token, groupId);
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
      if (data.section === this.contentManager.sectionName) {
        const {name, tokens, state = false} = data.content;

        const group = this.contentManager.createGroup(name, state);
        const groupId = await this.contentManager.addGroup(group);

        for (let token of tokens) {
          token.name = `${token.name}-${getRandomChars(4)}`;
          const newToken = this.contentManager.createToken(groupId, token.value, token.name);
          await this.contentManager.addToken(newToken, groupId);
        }
        this.message.success('Done');
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    } finally {
      this.message.remove(id);
    }
  }

  async copy(content: T | G) {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify({
          section: this.contentManager.sectionName,
          content
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
}