import { Injectable } from "@angular/core";
import SectionManagerTokensService from "@core/services/section-manager-tokens.service";
import { StorageGroup } from "@core/storages/storages-types";
import { BorderDBToken } from "../borders.model";

@Injectable()
export default class BordersManagerTokensService extends SectionManagerTokensService<BorderDBToken, StorageGroup> {

  getDefaultValue() {
    return {
      color: "#fff",
      width: 2,
      style: "solid",
    }
  }
}