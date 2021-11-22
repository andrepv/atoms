import { ModularScaleState } from "@shared/components/modular-scale-editor/modular-scale-editor.model";

export function getScaleValue(index: number, state: Pick<ModularScaleState, 'scaleRatio' | 'base'>) {
  const n = index - 2;
  const value = state.base * Math.pow(state.scaleRatio, n);
  return Number(value.toFixed(3));
}