import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CacheToken, CacheGroup } from '@core/core-types';
import { EditorService } from '@core/services/editor.service';
import SectionManagerContentService from '@core/services/section-manager-content.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.less']
})
export class TokenComponent implements OnInit {
  @ViewChild('editor') editorTemplateRef: TemplateRef<any>;

  @Input() token: CacheToken;
  @Input() group: CacheGroup;
  @Input() previewTemplate: TemplateRef<any>;
  @Input() editorTemplate: TemplateRef<any> = null;
  @Input() nameVisible = true;

  constructor(
    private editor: EditorService,
    private section: SectionManagerContentService,
  ) {}

  ngOnInit() {}

  openEditor = () => {
    this.editor.enable(
      this.section.name,
      {group: this.group, token: this.token},
      this.editorTemplateRef
    )
  }
}
