import Dexie from 'dexie';
import { TEXTSTYLES_DB_DATA, TextStylesManager } from '@typography/text-styles-section/text-styles.model';
import { TYPEFACE_DB_DATA, TypefaceManager } from '@typography/typeface-section/typeface.model';
import { ColorPaletteManager, COLORPALETTE_DB_DATA } from '@colors/color-palette-section/color-palette.model';
import { SpacingManager, SPACING_DB_DATA } from '@spacing/spacing.model';
import { DBSectionData, ThemeTable as ThemeStorage } from '@core/core-types';
import { BoxShadowManager, BOX_SHADOW_DB_DATA } from '@shadows/box-shadow-section/box-shadow-section.model';
import { BorderRadiusManager, BORDER_RADIUS_DB_DATA } from '@borders/border-radius-section/border-radius.model';
import { BorderManager, BORDER_DB_DATA } from '@borders/borders.model';
import { DurationsManager, DURATIONS_DB_DATA } from '@durations/durations.model';
import { CustomTokensManager, CUSTOM_TOKENS_DB_DATA } from '@custom-tokens/custom-tokens.model';
import { ExportConfigsStorage, ExportConfigsSectionStorage } from '../../types/export-types';
import BrowserStorageSectionContent from './browser-storage-section-content';
import { BrowserStorageSectionTokens } from './browser-storage-section-tokens';
import { BrowserStorageSectionGroups } from './browser-storage-section-groups';
import { BrowserStorageEntityManager } from './browser-storage-entity-manager';

const SECTIONS: DBSectionData[] = [
  TYPEFACE_DB_DATA,
  TEXTSTYLES_DB_DATA,
  SPACING_DB_DATA,
  COLORPALETTE_DB_DATA,
  BOX_SHADOW_DB_DATA,
  BORDER_RADIUS_DB_DATA,
  BORDER_DB_DATA,
  DURATIONS_DB_DATA,
  CUSTOM_TOKENS_DB_DATA
];

export class BrowserStorageDB extends Dexie {
  theme: ThemeStorage;
  exportConfigs: ExportConfigsStorage;
  exportConfigsSection: ExportConfigsSectionStorage;
  typeface: TypefaceManager;
  textStyles: TextStylesManager;
  spacing: SpacingManager;
  colorPalette: ColorPaletteManager;
  boxShadow: BoxShadowManager;
  borderRadius: BorderRadiusManager;
  border: BorderManager;
  durations: DurationsManager;
  customTokens: CustomTokensManager

  get sections() {
    return SECTIONS.map(section => this[section.tableGroupName])
  }

  constructor() {
    super('ui-theme-builder-db');

    const schema = this.getSchema();

    this.version(21).stores(schema);
    this.initEntities();
  }

  private getSchema() {
    const schema = {
      theme: '++id, name',
      exportConfigs: "++id",
      exportConfigsSection: "++id, commonConfigsId"
    }

    for (let section of SECTIONS) {
      schema[section.tokenTableName] = "++id, name, themeId, groupId";
      schema[section.groupTableName] = "++id, name, themeId";
    }

    return schema;
  }

  private initEntities() {
    this.theme = new BrowserStorageEntityManager(this.table("theme"));
    this.exportConfigs = new BrowserStorageEntityManager(this.table("exportConfigs"));
    this.exportConfigsSection = new BrowserStorageEntityManager(this.table("exportConfigsSection"));

    for (let section of SECTIONS) {
      const tokensManager = new BrowserStorageSectionTokens(
        this.table(section.tokenTableName)
      );
      const groupsManager = new BrowserStorageSectionGroups(
        this.table(section.groupTableName),
        tokensManager,
        this
      );

      this[section.tableGroupName] = new BrowserStorageSectionContent(section.name, tokensManager, groupsManager, this)
    }
  }
}

const browserStorageDB = new BrowserStorageDB();
browserStorageDB.open();
export {browserStorageDB};