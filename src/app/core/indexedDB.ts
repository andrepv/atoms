import Dexie from 'dexie';
import { TEXTSTYLES_DB_DATA, TextStylesTables } from '@typography/text-styles-section/text-styles.model';
import { TYPEFACE_DB_DATA, TypefaceTables } from '@typography/typeface-section/typeface.model';
import { LetterSpacingTables, LETTERSPACING_DB_DATA } from '@typography/letter-spacing-section/letter-spacing.model';
import { TypescaleTables, TYPESCALE_DB_DATA } from '@typography/typescale-section/typescale.model';
import { LineHeightTables, LINEHEIGHT_DB_DATA } from '@typography/line-height-section/line-height.model';
import { ColorPaletteTables, COLORPALETTE_DB_DATA } from '@colors/color-palette-section/color-palette.model';
import { SpacingTables, SPACING_DB_DATA } from '@spacing/spacing.model';
import { DBSectionData, SectionNames, ThemeTable } from '@core/core.model';
import { BoxShadowTables, BOX_SHADOW_DB_DATA } from '@shadows/box-shadow-section/box-shadow-section.model';
import { BorderRadiusTables, BORDER_RADIUS_DB_DATA } from '../modules/borders/border-radius-section/border-radius.model';
import { BorderTables, BORDER_DB_DATA } from '../modules/borders/borders.model';
import { DurationsTables, DURATIONS_DB_DATA } from '../modules/durations/durations.model';

const SECTIONS: DBSectionData[] = [
  TYPEFACE_DB_DATA,
  TYPESCALE_DB_DATA,
  LINEHEIGHT_DB_DATA,
  LETTERSPACING_DB_DATA,
  TEXTSTYLES_DB_DATA,
  SPACING_DB_DATA,
  COLORPALETTE_DB_DATA,
  BOX_SHADOW_DB_DATA,
  BORDER_RADIUS_DB_DATA,
  BORDER_DB_DATA,
  DURATIONS_DB_DATA,
];

export class DBService extends Dexie {
  theme: ThemeTable;
  typeface: TypefaceTables;
  typescale: TypescaleTables;
  lineHeight: LineHeightTables;
  letterSpacing: LetterSpacingTables;
  textStyles: TextStylesTables;
  spacing: SpacingTables;
  colorPalette: ColorPaletteTables;
  boxShadow: BoxShadowTables;
  borderRadius: BorderRadiusTables;
  border: BorderTables;
  durations: DurationsTables;

  get sections() {
    return SECTIONS.map(section => this[section.tableGroupName])
  }

  constructor() {
    super('ui-theme-builder-db');

    const token = "++id, name, themeId";
    const group = "++id, name, themeId, *tokensId";

    const schema = {theme: '++id, name'}

    for (let section of SECTIONS) {
      schema[section.tokenTableName] = token;
      schema[section.groupTableName] = group;
    }

    this.version(12).stores(schema);
    
    this.theme = this.table("theme");

    for (let section of SECTIONS) {
      this[section.tableGroupName] = new Tables(
        section.name,
        this.table(section.tokenTableName),
        this.table(section.groupTableName)
      )
    }
  }

  async deleteData(themeId: number) {
    for (let section of this.sections) {
      await section.deleteData(themeId)
    }
  }
}

class Tables<T extends Dexie.Table, G extends Dexie.Table> {
  constructor(
    public name: SectionNames,
    public token: T,
    public group: G,
  ) {}

  deleteData(themeId: number) {
    return db.transaction('rw', [this.token, this.group], async () => {
      const groups = await this.group.where("themeId").equals(themeId).toArray();

      for (let group of groups) {
        for (let tokenId of group.tokensId) {
          await this.token.delete(tokenId);
        }
        await this.group.delete(group.id);
      }
    })
  }

  async isTokenNameUnique(name: string, themeId: number) {
    const res = await this.token
    .where("name").equalsIgnoreCase(name)
    .and(token => token.themeId === themeId).toArray();
    return !Boolean(res.length);
  }
}

const db = new DBService();
export {db};