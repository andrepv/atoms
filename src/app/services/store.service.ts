import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
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
  anchorLink: string;
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

  subscription: Subscription;

  copiedGroupSection: SectionNames | '' = "";
  copiedTokenSection: SectionNames | '' = "";

  editorSection: SectionNames | '' = '';
  editableGroup$: BehaviorSubject<TokenGroup | null> = new BehaviorSubject(null);

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

    this.subscription = this.themeManager.selected$.subscribe(() => this.deactivateEditor())
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

    if (this.isGroupEditable(groupId)) {
      const nextEditableGroup = this.getGroupList(sectionName).find(group => this.isGroupEditable(group.id));

      this.editableGroup$.next(nextEditableGroup);
    }
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

  activateEditor(sectionName: SectionNames, anchorLink: string) {
    if (!anchorLink) return;
    const nextEditableGroup = this.getGroupList(sectionName).find(group => {
      return group.anchorLink === anchorLink.split('#')[1]
    });
    this.editorSection = sectionName;
    this.editableGroup$.next(nextEditableGroup);
  }

  deactivateEditor() {
    this.editorSection = '';
    this.editableGroup$.next(null);
  }

  private setClipboardActionsStatus(permissionStatus: PermissionState) {
    if (permissionStatus === 'denied') {
      this.isClipboardActionsAvailable = false;
    }
  }

  private updateSection() {
    this.section.content = this.groups;
  }

  isGroupEditable(groupId: number) {
    return groupId === this.editableGroup$.getValue()?.id;
  }
}
