import { Component, Input, OnInit } from '@angular/core';
import { getScaleValue } from '@utils';
import { CacheGroup } from '@core/core-types';
import { ModularScaleGroup, ModularScalePreset, ModularScaleToken } from './modular-scale-types';
import { MODULAR_SCALE_PRESETS } from './modular-scale-presets';
import SectionManagerGroupsService from '@core/services/section-manager-groups.service';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { StorageToken } from '@core/storages/storages-types';

@Component({
  selector: 'app-modular-scale-editor',
  templateUrl: './modular-scale-editor.component.html',
  styleUrls: ['./modular-scale-editor.component.less']
})
export class ModularScaleEditorComponent implements OnInit {
  @Input() group: CacheGroup<any, StorageToken & ModularScaleToken> & ModularScaleGroup;
  @Input() minBase = 4;
  @Input() maxBase = 100;
  @Input() units = 'px';
  @Input() title = 'Base Size';

  MODULAR_SCALE_PRESETS = MODULAR_SCALE_PRESETS;

  ratio: ModularScalePreset;
  base: number;

  constructor(
    private groups: SectionManagerGroupsService,
    private tokens: SectionManagerTokensService
  ) {}

  ngOnInit() {
    this.base = this.group.scaleBase;
    this.ratio = this.getInitialRatio();
  }

  updateModularScale() {
    this.group.tokens.forEach((token, index) => {
      if (!token.modularScaleTokenIsLocked) {
        const value = getScaleValue(index, this.ratio.value, this.base);
        this.tokens.update(token, {modularScaleTokenValue: value});
      }
    })

    this.groups.update(this.group, {scaleRatio: this.ratio.value})
    this.groups.update(this.group, {base: this.base})
  }

  setCustomRatio(value: number) {
    this.getPresetRatio({name: 'Custom'}).value = value;
    this.ratio.value = value;
    this.updateModularScale();
  }

  setPresetRatio(ratio: ModularScalePreset) {
    this.ratio = ratio;
    this.updateModularScale();
  }

  private getInitialRatio() {
    const preset = this.getPresetRatio({value: this.group.scaleRatio});

    if (preset) {
      return preset;
    }

    const customRatio = this.getPresetRatio({name: "Custom"});
    customRatio.value = this.group.scaleRatio;
    return customRatio;
  }

  private getPresetRatio({value, name}: {value?: number, name?: string}) {
    return this.MODULAR_SCALE_PRESETS.find(preset => {
      if (value) {
        return preset.value === value
      }
      if (name) {
        return preset.name = name;
      }
    });
  }
}
