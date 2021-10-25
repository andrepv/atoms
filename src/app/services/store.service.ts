import { Injectable } from '@angular/core';
import { ThemeManagerService } from './theme-manager.service';

export const SECTIONS = ["Type Face", "Type Scale", "Line Height", "Letter Spacing", "Text Styles", "Spacing"] as const;

export type SectionNames = "Type Face" | "Type Scale" | "Line Height" | "Letter Spacing" | "Text Styles" | "Spacing"; 

export interface Token<T = any> {
  name: string;
  id: number;
  value: T;
}

export interface TokenGroup {
  name: string;
  id: number;
  tokens: Token<any>[];
  anchorLink: string;
  state?: any;
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
  isClipboardActionsAvailable = true;

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

  constructor(public themeManager: ThemeManagerService) {
    const queryOpts = {
      name: 'clipboard-read' as PermissionName,
      allowWithoutGesture: false
    };
    navigator.permissions.query(queryOpts).then(permissionStatus => {

      this.setClipboardActionsStatus(permissionStatus.state);

      permissionStatus.onchange = () => {
        this.setClipboardActionsStatus(permissionStatus.state);
      };
    });
  }

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

  getGroupList(sectionName: SectionNames) {
    return this._groups[sectionName];
  }

  setGroupList(sectionName: SectionNames, groupList: TokenGroup[]) {
    this._groups[sectionName] = groupList;
    this.updateSection();
  }

  getSectionTokens(sectionName: SectionNames) {
    const tokens: Token[] = [];
    this.getGroupList(sectionName).forEach(group => {
      tokens.push(...group.tokens);
    })
    return tokens;
  }

  getSectionToken(sectionName: SectionNames, tokenId: number) {
    for (let group of this.getGroupList(sectionName)) {
      for (let token of group.tokens) {
        if (token.id === tokenId) return token;
      }
    }
    return false;
  }

  private setClipboardActionsStatus(permissionStatus: PermissionState) {
    if (permissionStatus === 'denied') {
      this.isClipboardActionsAvailable = false;
    }
  }

  private updateSection() {
    this.section.content = this.groups;
  }
}
