import { NzMessageService } from "ng-zorro-antd/message";
import { Injectable } from "@angular/core";
import { StorageGroup, StorageToken } from "@core/storages/storages-types";

@Injectable({providedIn: 'root'})
export class ClipboardService<T extends StorageToken = any, G extends StorageGroup = any> {
  static canUseClipboard = true;

  get isAvailable() {
    return ClipboardService.canUseClipboard;
  }

  constructor(private message: NzMessageService) {}

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

  async getCopiedData() {
    const text = await navigator.clipboard.readText();
    return JSON.parse(text);
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