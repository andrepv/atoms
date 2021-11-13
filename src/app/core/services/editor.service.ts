import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DBGroup, DBToken, EditableContent, SectionNames } from '@core/core.model';
import { ThemeManagerService } from './theme-manager.service';

@Injectable({
  providedIn: 'root'
})
export class EditorService<T extends DBToken = any, G extends DBGroup = any> {
  section: SectionNames | '' = '';

  content$: BehaviorSubject<EditableContent<G, T> | null> = new BehaviorSubject(null);

  set content(data: EditableContent<G, T>) {
    this.content$.next(data);
  }

  get content() {
    return this.content$.getValue();
  }

  get isActive() {
    return Boolean(this.section)
  }

  constructor(private themeManager: ThemeManagerService) {
    this.themeManager.selected$.subscribe(() => this.disable())
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

  enable(sectionName: SectionNames, content: EditableContent<G, T>) {
    this.section = sectionName;
    this.content = content;
  }

  disable() {
    this.section = '';
    this.content = null;
  }
}
