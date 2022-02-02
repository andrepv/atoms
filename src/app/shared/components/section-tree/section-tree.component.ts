import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-section-tree',
  templateUrl: './section-tree.component.html',
  styleUrls: ['./section-tree.component.less']
})
export class SectionTreeComponent implements OnInit {
  @Input() groups = [];
  @Input() leafTemplate: TemplateRef<any>;
  hiddenNodes = [];

  constructor() {}

  ngOnInit() {}

  toggleNode(nodeId: number) {
    if (this.isNodeHidden(nodeId)) {
      const index = this.hiddenNodes.indexOf(nodeId);
      this.hiddenNodes.splice(index, 1);
    } else {
      this.hiddenNodes.push(nodeId)
    }
  }

  isNodeHidden(nodeId: number) {
    return this.hiddenNodes.includes(nodeId);
  }
}
