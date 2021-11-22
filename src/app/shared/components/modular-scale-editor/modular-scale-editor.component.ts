import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditorService } from '@core/services/editor.service';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { getScaleValue } from '@utils';
import { DEFAULT_SCALE_BASE, DEFAULT_SCALE_RATIO, ModularScaleOption, ModularScaleState, MODULAR_SCALE_OPTIONS } from './modular-scale-editor.model';

@Component({
  selector: 'app-modular-scale-editor',
  templateUrl: './modular-scale-editor.component.html',
  styleUrls: ['./modular-scale-editor.component.less']
})
export class ModularScaleEditorComponent implements OnInit {
  readonly MODULAR_SCALE_OPTIONS = MODULAR_SCALE_OPTIONS
  isModularScaleEnabled = true;
  scaleRatio = DEFAULT_SCALE_RATIO;
  base = DEFAULT_SCALE_BASE;

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
    this.base = DEFAULT_SCALE_BASE;
  }

}
