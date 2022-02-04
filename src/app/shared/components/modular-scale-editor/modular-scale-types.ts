export type ModularScaleToken = {
  modularScaleTokenValue: number,
  modularScaleTokenIsLocked: boolean,
  units: string,
}

export type ModularScaleGroup = {
  scaleBase: number,
  scaleRatio: number,
}

export type ModularScalePreset = {
  name: string,
  value: number
}