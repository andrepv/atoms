import { StorageGroup, StorageToken } from "@core/storages/storages-types";

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

export type StorageModularScaleGroup = StorageGroup & ModularScaleGroup;
export type StorageModularScaleToken = StorageToken & ModularScaleToken;