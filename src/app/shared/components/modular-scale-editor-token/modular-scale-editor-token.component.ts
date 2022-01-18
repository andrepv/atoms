import { Component, Input, OnInit } from '@angular/core';
import { EditableContent, DBGroup, DBToken } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { ModularScaleToken } from '../modular-scale-editor/modular-scale-types';

@Component({
  selector: 'app-modular-scale-editor-token',
  templateUrl: './modular-scale-editor-token.component.html',
  styleUrls: ['./modular-scale-editor-token.component.less']
})
export class ModularScaleEditorTokenComponent implements OnInit {
  @Input() content: EditableContent<DBToken & ModularScaleToken, DBGroup>;
  @Input() minValue = 1;
  @Input() maxValue = Infinity;
  @Input() title: string;
  @Input() units = 'px';

  constructor(public section: SectionContentManagerService<DBToken & ModularScaleToken>) {}

  ngOnInit() {}

  setValue(value: number) {
    this.section.updateToken(this.content.token, this.content.group, {modularScaleTokenValue: value});

    if (!this.content.token.modularScaleTokenIsLocked) {
      this.section.updateToken(this.content.token, this.content.group, {modularScaleTokenIsLocked: true});
    }
  }
}
