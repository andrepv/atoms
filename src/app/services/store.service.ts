import { Injectable } from '@angular/core';
import { ThemeManagerService } from './theme-manager.service';

export type SectionNames = "Type Face" | "Type Scale"; 

export interface Token<T> {
  name: string;
  id: number;
  value: T;
}

export interface TokenGroup {
  name: string;
  id: number;
  tokens: Token<any>[];
}

export type TokenGroups = {
  name: string;
  content: TokenGroup[];
}[];

export interface Section {
  name: string;
  content: TokenGroups;
}

@Injectable({ providedIn: 'root' })
export class StoreService {
  isLoading = false;
  _groups: {[key: string]: TokenGroup[]} = {}

  get groups(): TokenGroups {
    const groups = Object.entries(this._groups);
    if (!groups.length) {
      return [];
    }
    return groups.map(([name, content]) => ({name, content}))
  }

  section: Section = {
    name: "",
    content: this.groups,
  };

  constructor(public themeManager: ThemeManagerService) {}

  loadTheme() {
    return this.themeManager.loadList();
  }

  setSection(sectionName: string, content: {[key: string]: TokenGroup[]}) {
    this.section.name = sectionName;
    this._groups = content;
    this.updateSection();
  }

  addGroup(sectionName: SectionNames, group: TokenGroup) {
    this.getGroupList(sectionName).push(group);
    this.updateSection();
  }

  deleteGroup(sectionName: SectionNames, groupId: number) {
    const nextGroups = this.getGroupList(sectionName).filter(group => group.id !== groupId);
    this.setGroupList(sectionName, nextGroups)
  }

  getGroup(sectionName: SectionNames, groupId: number) {
    return this.getGroupList(sectionName).find(group => group.id === groupId)
  }

  updateGroup(
    sectionName: SectionNames,
    groupId: number,
    callback: (group: TokenGroup) => void,
  ) {
    this._groups[sectionName] = this.getGroupList(sectionName).map(group => {
      if (group.id === groupId) {
        callback(group);
      }
      return group;
    });
    this.updateSection();
  }

  getGroupTokenIds(sectionName: SectionNames, groupId: number) {
    const group = this.getGroup(sectionName, groupId);
    return group.tokens.map(token => token.id);
  }


  private updateSection() {
    this.section.content = this.groups;
  }

  getGroupList(sectionName: SectionNames) {
    return this._groups[sectionName];
  }

  setGroupList(sectionName: SectionNames, groupList: TokenGroup[]) {
    this._groups[sectionName] = groupList;
    this.updateSection();
  }

  getAnchorLink(group: TokenGroup) {
    return `${group.name.toLowerCase()}-${group.id}`
  }
}
