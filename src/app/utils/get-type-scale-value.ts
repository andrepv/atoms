import { ModularScaleState } from "../editors/modular-scale-editor/modular-scale-editor.component";

export function getScaleValue(index: number, state: ModularScaleState) {
  const n = index - 2;
  const value = state.base * Math.pow(state.scaleRatio, n);
  return Number(value.toFixed(3));
}