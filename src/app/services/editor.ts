import { BehaviorSubject } from 'rxjs';
import { SectionNames, StoreService, Token, TokenGroup } from "./store.service";

type EditableContent = {group: TokenGroup, token?: Token};

export class Editor {
  section: SectionNames | '' = '';

  content$: BehaviorSubject<EditableContent | null> = new BehaviorSubject(null);

  set content(data: EditableContent) {
    this.content$.next(data);
  }

  get content() {
    return this.content$.getValue();
  } 

  constructor(private store: StoreService) {
    this.store.themeManager.selected$.subscribe(() => this.disable())
  }

  isGroupEditable(groupId: number, sectionName: SectionNames) {
    const {group} = this.content;
    return groupId === group?.id && this.section === sectionName;
  }

  isTokenEditable(tokenId: number, sectionName: SectionNames) {
    const {token} = this.content;
    return tokenId === token?.id && this.section === sectionName;
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