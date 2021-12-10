import { Injectable, TemplateRef } from '@angular/core';
import { DBGroup, DBToken, EditableContent, SectionNames } from '@core/core.model';
import { ThemeManagerService } from './theme-manager.service';

@Injectable({
  providedIn: 'root'
})
export class EditorService<T extends DBToken = any, G extends DBGroup = any> {

  editorTemplateRef: TemplateRef<any>;
  section: SectionNames | '' = '';
  content: EditableContent<G, T>;

  get isActive() {
    return Boolean(this.section)
  }

  constructor(private themeManager: ThemeManagerService) {
    this.themeManager.selected$.subscribe(() => this.disable())
  }

  isGroupEditable(groupId: number, sectionName: SectionNames) {
    if (this.content) {
      return groupId === this.content.group?.id && this.section === sectionName;
    }
    return false;
  }

  isTokenEditable(tokenId: number, sectionName: SectionNames) {
    if (!this.content) return false;
    if (this.content.token) {
      return tokenId === this.content.token.id && this.section === sectionName;
    }
    return false;
  }

  enable(
    sectionName: SectionNames,
    content: EditableContent,
    templateRef: TemplateRef<any>,
  ) {
    this.section = sectionName;
    this.editorTemplateRef = templateRef;
    this.content = content;
  }

  disable() {
    this.section = '';
    this.editorTemplateRef = null;
    this.content = null;
  }
}
