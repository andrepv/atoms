import { Component, OnInit } from '@angular/core';
import { ThemeManagerService } from '../../services/theme-manager.service';
import { ExplorerService, Section, TokenGroup } from '../explorer/explorer.service';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.less']
})
export class TypographyComponent implements OnInit {
  typefaceGroups: TokenGroup[] = [{
    name: "group-1",
    id: 1,
    tokens: [
      {name: "Font-Primary", id: 1},
      {name: "Font-Secondary", id: 2}
    ]
  }];

  section: Section = {
    name: "Typography",
    content: [
      {name: "Type Face", content: this.typefaceGroups},
    ]
  }

  constructor(
    public themes: ThemeManagerService,
    public explorer: ExplorerService,
  ) {}

  ngOnInit(): void {
    this.explorer.section = this.section;
  }

  updateSection() {
    this.section = {
      name: "Typography",
      content: [
        {name: "Type Face", content: this.typefaceGroups},
      ]
    }

    this.explorer.section = this.section
  }

  addGroup() {
    const newGroup = {
      name: "group-2",
      id: 2,
      tokens: [
        {name: "Font-Primary-1", id: 3},
        {name: "Font-Secondary-2", id: 4}
      ]
    }
    this.typefaceGroups.push(newGroup)
    this.updateSection();
  }

}
