import { Injectable } from '@angular/core';
import { SectionNames, StoreGroup, PageName } from '@core/core.model';
import { ThemeManagerService } from './theme-manager.service';

interface StorePageContent {
  [sectionName: string]: StoreGroup[]
} 

interface StorePage {
  name: PageName | '';
  content: StorePageContent;
}

@Injectable({ providedIn: 'root' })
export class StoreService {
  isLoading = false;

  private page: StorePage = {
    name: "",
    content: {},
  }

  constructor(public themeManager: ThemeManagerService) {}

  loadTheme() {
    return this.themeManager.loadList();
  }

  setPageStructure(page: StorePage) {
    this.page = page;
  }

  setSectionContent(
    sectionName: SectionNames,
    groupList: StoreGroup[]
  ) {
    this.page.content[sectionName] = groupList;
  }


  addGroup(sectionName: SectionNames, group: StoreGroup) {
    this.page.content[sectionName].push(group);
  }

  deleteGroup(sectionName: SectionNames, groupId: number) {
    const group = this.getGroup(sectionName, groupId);
    const index = this.page.content[sectionName].indexOf(group);
    if (index > -1) {
      this.page.content[sectionName].splice(index, 1);
    }
  }

  getGroup(sectionName: SectionNames, groupId: number) {
    return this.getGroupList(sectionName).find(({id}) => id === groupId)
  }
  
  getGroupList(sectionName: SectionNames) {
    return this.page.content[sectionName];
  }

  updateGroup(group: StoreGroup, sectionName: SectionNames) {
    const index = this.page.content[sectionName].indexOf(group);
    if (index > -1) {
      this.page.content[sectionName][index] = {...group};
    }
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

  getGroupToken(
    sectionName: SectionNames,
    groupId: number,
    tokenId: number
  ) {
    const {tokens} = this.getGroup(sectionName, groupId)
    return tokens.find(({id}) => id === tokenId)
  }
}
