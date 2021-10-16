import { ModularScaleState } from "../editors/typescale-editor/typescale-editor.component";

export function getScaleValue(index: number, state: ModularScaleState) {
  const n = index - 2;
  const value = state.baseFontSize * Math.pow(state.scaleRatio, n);
  return Number(value.toFixed(3));
}