import { Injectable } from '@angular/core';

export interface Token {
  name: string;
  id: number;
}

export interface TokenGroup {
  name: string;
  id: number;
  tokens: Token[];
}

export interface Section {
  name: string;
  content: {
    name: string;
    content: TokenGroup[];
  }[]
}

@Injectable({providedIn: 'root'})
export class ExplorerService {
  section: Section = {
    name: "",
    content: []
  }

  constructor() {}

  getAnchorLink(group: TokenGroup) {
    return `${group.name.toLowerCase()}-${group.id}`
  }
}
