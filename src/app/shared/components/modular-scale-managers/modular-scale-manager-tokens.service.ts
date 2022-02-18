import { Injectable } from "@angular/core";
import { CacheGroup, CacheToken } from "@core/core-types";
import SectionManagerTokensService from "@core/services/section-manager-tokens.service";
import { StorageGroup, StorageToken } from "@core/storages/storages-types";
import { getScaleValue } from "@utils/get-type-scale-value";
import { ModularScaleToken, ModularScaleGroup } from "../modular-scale-editor/modular-scale-types";

type StorageModularScaleGroup = StorageGroup & ModularScaleGroup;
type StorageModularScaleToken = StorageToken & ModularScaleToken;

@Injectable()
export default class ModularScaleManagerTokensService<T extends StorageModularScaleToken = any, G extends StorageModularScaleGroup = any> extends SectionManagerTokensService<T, G> {

  async load(query: {index: string, key: number}) {
    const tokens = await super.load(query);

    return tokens.sort((a,b) => {
      let posA = a.modularScaleTokenPosition;
      let posB = b.modularScaleTokenPosition;

      if (posA > posB) return -1;
      else return 0;
    })
  }

  getStyleValue(token: CacheToken): any {
    return `${token.modularScaleTokenValue}${this.getUnits()}`;
  }

  getUnits() {
    return 'px';
  }

  addHigh(group: CacheGroup<G, T>) {
    const maxPos = this.getLargestScalePosition(group.tokens);
    const position = maxPos + 1;

    return this.add(
      this.createToken(position, group),
      group.tokens,
    );
  }

  addLow(group: CacheGroup<G, T>) {
    const minPos = this.getSmallestScalePosition(group.tokens);
    const position = minPos - 1;

    return this.add(
      this.createToken(position, group),
      group.tokens
    );
  }

  addToCache(token: T, container: any[]) {
    const maxPos = this.getLargestScalePosition(container);
    const minPos = this.getSmallestScalePosition(container);
    const tokenPos = token.modularScaleTokenPosition;

    if (tokenPos > maxPos) {
      container.unshift(token)
    } else if (tokenPos < minPos) {
      container.push(token)
    } else {
      const index = maxPos - tokenPos;
      container.splice(index + 1, null, token)
    }
  }

  private createToken(position: number, group: CacheGroup<G, T>) {
    const modularScaleTokenValue = getScaleValue(position, group.scaleRatio, group.scaleBase);

    return this.create(group, {
      ...this.getDefaultValue(group),
      modularScaleTokenValue,
      modularScaleTokenIsLocked: false,
      modularScaleTokenPosition: position,
    })
  }

  private getLargestScalePosition(tokens: T[]) {
    return tokens[0]?.modularScaleTokenPosition ?? 0;
  }

  private getSmallestScalePosition(tokens: T[]) {
    return tokens[tokens.length - 1]?.modularScaleTokenPosition ?? 1;
  }
}