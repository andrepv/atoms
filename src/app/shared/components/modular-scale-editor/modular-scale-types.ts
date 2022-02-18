export type ModularScaleToken = {
  modularScaleTokenValue: number,
  modularScaleTokenIsLocked: boolean,
  modularScaleTokenPosition: number,
  units?: string,
}

export type ModularScaleGroup = {
  scaleBase: number,
  scaleRatio: number,
}

export type ModularScalePreset = {
  name: string,
  value: number
}