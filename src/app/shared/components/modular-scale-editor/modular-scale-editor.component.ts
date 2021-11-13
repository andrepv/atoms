import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditorService } from '@core/services/editor.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { getScaleValue } from '@utils';

export type ModularScaleOption = {name: string, value: number}

export interface ModularScaleState {
  scaleRatio: number;
  base: number;
  isModularScaleEnabled: boolean;
}

export const MODULAR_SCALE_OPTIONS: ModularScaleOption[] = [
  {name: "15:16 – Minor Second", value: 1.067},
  {name: "8:9 – Major Second", value: 1.125},
  {name: "5:6 – Minor Third", value: 1.2},
  {name: "4:5 – Major Third", value: 1.25},
  {name: "3:4 – Perfect Fourth", value: 1.333},
  {name: "1:√2 – Aug. Fourth / Dim. Fifth", value: 1.414},
  {name: "2:3 – Perfect Fifth", value: 1.5},
  {name: "5:8 – Minor Sixth", value: 1.6},
  {name: "1:1.618 – Golden Section", value: 1.618},
  {name: "3:5 – Major Sixth", value: 1.667},
  {name: "9:16 – Minor Seventh", value: 1.778},
  {name: "8:15 – Major Seventh", value: 1.875},
  {name: "1:2 – Octave", value: 2},
  {name: "2:5 – Major Tenth", value: 2.5},
  {name: "3:8 – Major Eleventh", value: 2.667},
  {name: "1:3 – Major Twelfth", value: 3},
  {name: "1:4 – Double Octave", value: 4},
];

export const DEFAULT_BASE = 16;
export const DEFAULT_SCALE_RATIO = MODULAR_SCALE_OPTIONS[0];

@Component({
  selector: 'app-modular-scale-editor',
  templateUrl: './modular-scale-editor.component.html',
  styleUrls: ['./modular-scale-editor.component.less']
})
export class ModularScaleEditorComponent implements OnInit {
  readonly MODULAR_SCALE_OPTIONS = MODULAR_SCALE_OPTIONS
  isModularScaleEnabled = true;
  scaleRatio = DEFAULT_SCALE_RATIO;
  base = DEFAULT_BASE;

  private destroy$ = new Subject();

  get editableGroupId() {
    return this.editor.content.group.id;
  }

  get state() {
    return {
      scaleRatio: this.scaleRatio.value,
      base: this.base,
      isModularScaleEnabled: this.isModularScaleEnabled
    }
  }

  constructor(
    private editor: EditorService,
    private section: SectionContentManagerService,
  ) {}

  ngOnInit() {
    this.editor.content$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(content => {
        this.resetState();
        this.setState(content.group.state.scale);
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onScaleRatioChange(ratio: ModularScaleOption) {
    this.scaleRatio = ratio;
    this.updateModularScale();
  }

  updateModularScale() {
    const groupId = this.editableGroupId;

    if (!this.state.isModularScaleEnabled) {
      this.section.setGroupState(groupId, {scale: false});
      return;
    }
    const group = this.section.getGroup(groupId);

    group.tokens.forEach((token, index) => {
      const value = getScaleValue(index, this.state);
      this.section.setTokenValue(value, token.id, groupId);
    })

    this.section.setGroupState(groupId, {scale: {
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

  private resetState() {
    this.isModularScaleEnabled = true;
    this.scaleRatio = DEFAULT_SCALE_RATIO;
    this.base = DEFAULT_BASE;
  }

}
