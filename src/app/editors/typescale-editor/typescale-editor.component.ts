import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditorService } from '../../layout/editor/editor.service';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';
import { StoreService } from '../../services/store.service';
import { getScaleValue } from '../../utils/get-type-scale-value';

export type ModularScaleOption = {name: string, value: number}

export type ModularScaleState = {
  scaleRatio: number;
  baseFontSize: number;
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

export const DEFAULT_BASE_FONT_SIZE = 16;
export const DEFAULT_SCALE_RATIO = MODULAR_SCALE_OPTIONS[0];

@Component({
  selector: 'app-typescale-editor',
  templateUrl: './typescale-editor.component.html',
  styleUrls: ['./typescale-editor.component.less'],
  providers: [
    {provide: 'tables', useValue: db.typescale},
    ContentManagerService,
  ]
})
export class TypescaleEditorComponent implements OnInit {
  readonly MODULAR_SCALE_OPTIONS = MODULAR_SCALE_OPTIONS
  isModularScaleEnabled = true;
  scaleRatio = DEFAULT_SCALE_RATIO;
  baseFontSize = DEFAULT_BASE_FONT_SIZE;

  private destroy$ = new Subject();

  get editableGroupId() {
    return this.editor.content.group.id;
  }

  get state() {
    return {
      scaleRatio: this.scaleRatio.value,
      baseFontSize: this.baseFontSize,
      isModularScaleEnabled: this.isModularScaleEnabled
    }
  }

  private get sectionName() {
    return this.contentManager.sectionName;
  }

  constructor(
    private editor: EditorService,
    private store: StoreService,
    public contentManager: ContentManagerService,
  ) {}

  ngOnInit() {
    this.editor.content$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(content => {
        this.resetState();
        this.setState(content.group.state);
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

  private setState(state: ModularScaleState | undefined) {
    if (state) {
      this.isModularScaleEnabled = true;
      this.scaleRatio = MODULAR_SCALE_OPTIONS.find(option => option.value === state.scaleRatio);
      this.baseFontSize = state.baseFontSize;
    } else {
      this.isModularScaleEnabled = false;
    }
  }

  private resetState() {
    this.isModularScaleEnabled = true;
    this.scaleRatio = DEFAULT_SCALE_RATIO;
    this.baseFontSize = DEFAULT_BASE_FONT_SIZE;
  }

  updateModularScale() {
    const groupId = this.editableGroupId;

    if (!this.state.isModularScaleEnabled) {
      this.contentManager.setGroupState(groupId, false);
      return;
    }
    const group = this.store.getGroup(this.sectionName, groupId);

    group.tokens.forEach((token, index) => {
      const value = getScaleValue(index, this.state);
      this.contentManager.setTokenValue(value, token.id, groupId);
    })

    this.contentManager.setGroupState(groupId, {
      scaleRatio: this.state.scaleRatio,
      baseFontSize: this.state.baseFontSize,
    })
  }
}
