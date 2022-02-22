import { Component, Input, OnInit } from '@angular/core';
import SectionManagerContentService from '@core/services/section-manager-content.service';

@Component({
  selector: 'app-section-tree',
  templateUrl: './section-tree.component.html',
  styleUrls: ['./section-tree.component.less']
})
export class SectionTreeComponent implements OnInit {
  @Input() groups = [];
  private expandedNodes = new Set([0]);

  constructor(public section: SectionManagerContentService) {}

  ngOnInit() {}

  toggleNode(nodeId: number) {
    if (this.isNodeHidden(nodeId)) {
      this.expandedNodes.add(nodeId);
    } else {
      this.expandedNodes.delete(nodeId)
    }
  }

  isNodeHidden(nodeId: number) {
    return !this.expandedNodes.has(nodeId);
  }
}
