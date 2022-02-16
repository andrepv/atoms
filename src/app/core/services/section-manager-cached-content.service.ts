import { Injectable } from '@angular/core';
import { SectionNames, CacheGroup, PageName } from '@core/core-types';
import { SectionContentEditorService } from './section-content-editor.service';

export interface CachePageContent {
  [sectionName: string]: CacheGroup[];
}

export interface CachePage {
  name: PageName | '';
  content: CachePageContent;
}

@Injectable({ providedIn: 'root' })
export class SectionManagerCachedContentService {
  isLoading = false;

  page: CachePage = {
    name: "",
    content: {},
  }

  constructor(private editor: SectionContentEditorService) {}

  addPage(page: CachePage) {
    this.page = page;
  }

  setSectionContent(
    sectionName: SectionNames,
    groupList: CacheGroup[]
  ) {
    this.page.content[sectionName] = groupList;
  }

  addGroup(sectionName: SectionNames, group: CacheGroup) {
    this.page.content[sectionName].push(group);
  }

  deleteGroup(sectionName: SectionNames, groupId: number) {
    const group = this.getGroup(sectionName, groupId);

    if (this.editor.isGroupEditable(group.id, sectionName)) {
      this.editor.disable();
    }
  
    group.tokens.map(token => {
      if (this.editor.isTokenEditable(token.id, sectionName)) {
        this.editor.disable();
      }
    })

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

  updateGroup(group: CacheGroup, sectionName: SectionNames) {
    const index = this.page.content[sectionName].indexOf(group);
    if (index > -1) {
      this.page.content[sectionName][index] = {...group};
    }
  }

  getSectionTokens(sectionName: SectionNames) {
    return this.getGroupList(sectionName).reduce((acc, group) => {
      acc.push(...group.tokens);
      return acc
    }, [])
  }

  getSectionToken(sectionName: SectionNames, tokenId: number) {
    for (let group of this.getGroupList(sectionName)) {
      for (let token of group.tokens) {
        if (token.id === tokenId) return token;
      }
    }
  }

  deleteToken(
    sectionName: SectionNames,
    group: CacheGroup,
    tokenId: number
  ) {
    if (this.editor.isTokenEditable(tokenId, sectionName)) {
      this.editor.disable();
    }

    group.tokens = group.tokens.filter(({id}) => id !== tokenId)
  }
}
