import { Component, Input, OnInit } from '@angular/core';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { getScaleValue } from '@utils';
import { DEFAULT_SCALE_BASE, DEFAULT_SCALE_RATIO, ModularScaleOption, ModularScaleState, MODULAR_SCALE_OPTIONS } from './modular-scale-editor.model';
import { StoreGroup } from '@core/core.model';

@Component({
  selector: 'app-modular-scale-editor',
  templateUrl: './modular-scale-editor.component.html',
  styleUrls: ['./modular-scale-editor.component.less']
})
export class ModularScaleEditorComponent implements OnInit {
  @Input() group: StoreGroup;
  @Input() minBaseValue = 4;
  @Input() maxBaseValue = 100;
  @Input() private defaultBase = DEFAULT_SCALE_BASE;

  readonly MODULAR_SCALE_OPTIONS = MODULAR_SCALE_OPTIONS
  isModularScaleEnabled = true;
  scaleRatio = DEFAULT_SCALE_RATIO;
  base = this.defaultBase;

  get state() {
    return {
      scaleRatio: this.scaleRatio.value,
      base: this.base,
      isModularScaleEnabled: this.isModularScaleEnabled
    }
  }

  constructor(
    private section: SectionContentManagerService,
  ) {}

  ngOnInit() {
    this.base = this.defaultBase;
    this.setState(this.group.scale);
  }

  onScaleRatioChange(ratio: ModularScaleOption) {
    this.scaleRatio = ratio;
    this.updateModularScale();
  }

  updateModularScale() {
    if (!this.isModularScaleEnabled) {
      this.section.updateGroup(this.group, {scale: false})
      return;
    }

    this.group.tokens.forEach((token, index) => {
      const value = getScaleValue(index, this.state);

      this.section.updateToken(token, this.group, {value});
    })

    this.section.updateGroup(this.group, {scale: {
      scaleRatio: this.state.scaleRatio,
      base: this.state.base,
    }})
  }

  private setState(state: ModularScaleState | undefined) {
    if (state) {
      this.isModularScaleEnabled = true;
      this.scaleRatio = MODULAR_SCALE_OPTIONS.find(option => option.value === state.scaleRatio);
      this.base = state.base;
    } else {
      this.isModularScaleEnabled = false;
    }
  }
}
