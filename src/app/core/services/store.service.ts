import { Injectable } from '@angular/core';
import { SectionNames, StoreGroup, PageName, DBToken, DBGroup } from '@core/core.model';
import { ThemeManagerService } from './theme-manager.service';

export const SECTIONS = ["Type Face", "Type Scale", "Line Height", "Letter Spacing", "Text Styles", "Spacing", "Color Palette"] as const;


interface StoreNormalizedPageContent<G extends DBGroup = any, T extends DBToken = any> {
  [sectionName: string]: StoreGroup<G, T>[]
}

interface StorePage {
  name: PageName | '';
  content: StoreGroupList;
}

type StoreGroupList = {
  name: string;
  content: StoreGroup[];
}[];


@Injectable({ providedIn: 'root' })
export class StoreService {
  isLoading = false;
  isClipboardActionsAvailable = true;

  _groups: {[sectionName: string]: StoreGroup[]} = {}

  get groups(): StoreGroupList {
    const groups = Object.entries(this._groups);
    if (!groups.length) {
      return [];
    }
    return groups.map(([name, content]) => ({name, content}))
  }

  page: StorePage = {
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

  setPageStructure(
    pageName: PageName,
    content: StoreNormalizedPageContent
  ) {
    this.page.name = pageName;
    this._groups = content;
    this.updateSection();
  }

  addGroup(sectionName: SectionNames, group: StoreGroup) {
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

  // ???
  updateGroup(
    sectionName: SectionNames,
    groupId: number,
    callback: (group: StoreGroup) => void,
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

  setGroupList(sectionName: SectionNames, groupList: StoreGroup[]) {
    this._groups[sectionName] = groupList;
    this.updateSection();
  }

  getSectionTokens(sectionName: SectionNames) {
    const tokens = [];
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
    this.page.content = this.groups;
  }
}
