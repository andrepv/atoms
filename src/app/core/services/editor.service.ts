import { Injectable, TemplateRef } from '@angular/core';
import { EditableContent, SectionNames } from '@core/core-types';
import { StorageToken, StorageGroup } from '@core/storages/storages-types';
import { ThemeManagerService } from './theme-manager.service';

@Injectable({
  providedIn: 'root'
})
export class EditorService<T extends StorageToken = any, G extends StorageGroup = any> {

  editorTemplateRef: TemplateRef<any>;
  section: SectionNames | '' = '';
  content: EditableContent<T, G>;

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
    this.content = content;
    this.section = sectionName;
    this.editorTemplateRef = templateRef;
  }

  disable() {
    this.section = '';
    this.editorTemplateRef = null;
    this.content = null;
  }
}
