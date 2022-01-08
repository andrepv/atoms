import { Component, Input, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { getScaleValue } from '@utils';
import { DBToken, StoreGroup } from '@core/core.model';
import { ModularScaleGroup, ModularScalePreset, ModularScaleToken } from './modular-scale-types';
import { MODULAR_SCALE_PRESETS } from './modular-scale-presets';

@Component({
  selector: 'app-modular-scale-editor',
  templateUrl: './modular-scale-editor.component.html',
  styleUrls: ['./modular-scale-editor.component.less']
})
export class ModularScaleEditorComponent implements OnInit {
  @Input() group: StoreGroup<any, DBToken & ModularScaleToken> & ModularScaleGroup;
  @Input() minBase = 4;
  @Input() maxBase = 100;

  MODULAR_SCALE_PRESETS = MODULAR_SCALE_PRESETS;

  ratio: ModularScalePreset;
  base: number;

  constructor(private section: SectionContentManagerService<DBToken & ModularScaleToken>) {}

  ngOnInit() {
    this.base = this.group.scaleBase;
    this.ratio = this.getInitialRatio();
  }

  updateModularScale() {
    this.group.tokens.forEach((token, index) => {
      if (!token.modularScaleTokenIsLocked) {
        const value = getScaleValue(index, this.ratio.value, this.base);
        this.section.updateToken(token, this.group, {
          modularScaleTokenValue: value
        });
      }
    })

    this.section.updateGroup(this.group, {scaleRatio: this.ratio.value})
    this.section.updateGroup(this.group, {base: this.base})
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
