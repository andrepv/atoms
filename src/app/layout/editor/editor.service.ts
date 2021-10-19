import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SectionNames, StoreService, Token, TokenGroup } from "../../services/store.service";

export type EditableContent = {group: TokenGroup, token?: Token};

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  section: SectionNames | '' = '';

  content$: BehaviorSubject<EditableContent | null> = new BehaviorSubject(null);

  set content(data: EditableContent) {
    this.content$.next(data);
  }

  get content() {
    return this.content$.getValue();
  }

  get isActive() {
    return Boolean(this.section)
  }

  constructor(private store: StoreService) {
    this.store.themeManager.selected$.subscribe(() => this.disable())
  }

  isGroupEditable(groupId: number, sectionName: SectionNames) {
    const {group} = this.content;
    return groupId === group?.id && this.section === sectionName;
  }

  isTokenEditable(tokenId: number, sectionName: SectionNames) {
    if (this.content?.token) {
      const {token} = this.content;
      return tokenId === token?.id && this.section === sectionName;
    }
    return false;
  }

  enable(sectionName: SectionNames, content: EditableContent) {
    this.section = sectionName;
    this.content = content;
  }

  disable() {
    this.section = '';
    this.content = null;
  }
}
