import { Component, Input, OnInit } from '@angular/core';
import SectionManagerContentService from '@core/services/section-manager-content.service';

@Component({
  selector: 'app-section-tree',
  templateUrl: './section-tree.component.html',
  styleUrls: ['./section-tree.component.less']
})
export class SectionTreeComponent implements OnInit {
  @Input() groups = [];
  private hiddenNodes = new Set();

  constructor(public section: SectionManagerContentService) {}

  ngOnInit() {}

  toggleNode(nodeId: number) {
    if (this.isNodeHidden(nodeId)) {
      this.hiddenNodes.delete(nodeId);
    } else {
      this.hiddenNodes.add(nodeId)
    }
  }

  isNodeHidden(nodeId: number) {
    return this.hiddenNodes.has(nodeId);
  }
}
