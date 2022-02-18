import { Component, Input, OnInit } from '@angular/core';
import { EditableSectionContent } from '@core/core-types';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { StorageGroup, StorageToken } from '@core/storages/storages-types';
import { ModularScaleToken } from '../modular-scale-editor/modular-scale-types';

@Component({
  selector: 'app-modular-scale-editor-token',
  templateUrl: './modular-scale-editor-token.component.html',
  styleUrls: ['./modular-scale-editor-token.component.less']
})
export class ModularScaleEditorTokenComponent implements OnInit {
  @Input() content: EditableSectionContent<StorageToken & ModularScaleToken, StorageGroup>;
  @Input() minValue = 1;
  @Input() maxValue = Infinity;
  @Input() title: string;
  @Input() units = 'px';

  constructor(private tokens: SectionManagerTokensService) {}

  ngOnInit() {}

  setValue(value: number) {
    this.tokens.update(this.content.token, {modularScaleTokenValue: value});

    if (!this.content.token.modularScaleTokenIsLocked) {
      this.tokens.update(this.content.token, {modularScaleTokenIsLocked: true})
    }
  }

  toggleLock(value: boolean) {
    this.tokens.update(this.content.token, {
      modularScaleTokenIsLocked: !value,
    });
  }
}
