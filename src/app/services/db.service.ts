import Dexie, { PromiseExtended } from 'dexie';
import { ColorPaletteTables, COLORPALETTE_DB_DATA } from '../sections/color-palette/color-palette.model';
import { LetterSpacingTables, LETTERSPACING_DB_DATA } from '../sections/letter-spacing/letter-spacing.model';
import { LineHeightTables, LINEHEIGHT_DB_DATA } from '../sections/line-height/line-height.model';
import { SpacingTables, SPACING_DB_DATA } from '../sections/spacing/spacing.model';
import { TextStylesTables, TEXTSTYLES_DB_DATA } from '../sections/text-styles/text-styles.model';
import { TypefaceTables, TYPEFACE_DB_DATA } from '../sections/typeface/typeface.model';
import { TypescaleTables, TYPESCALE_DB_DATA } from '../sections/typescale/typescale.model';
import { SectionNames } from './store.service';
import { ThemeTable } from './theme-manager.service';

export type DBSectionData = {
  tableGroupName: string;
  tokenTableName: string;
  groupTableName: string;
  name: SectionNames;
}

const SECTIONS: DBSectionData[] = [
  TYPEFACE_DB_DATA,
  TYPESCALE_DB_DATA,
  LINEHEIGHT_DB_DATA,
  LETTERSPACING_DB_DATA,
  TEXTSTYLES_DB_DATA,
  SPACING_DB_DATA,
  COLORPALETTE_DB_DATA
];

export type TokenModel<T = any> = {
  id: number;
  name: string;
  value: T;
  groupId: number;
  themeId: number;
}

export type TokenGroupModel<T = any> = {
  id: number;
  name: string;
  themeId: number;
  tokensId: number[];
  state?: T;
}

export type Table = Dexie.Table;

export interface ITables<T, G> {
  name: SectionNames;
  token: T;
  group: G;
  deleteData: (themeId: number) => PromiseExtended<void>;
  isTokenNameUnique: (name: string, themeId: number) => Promise<boolean>;
}

export class DBService extends Dexie {
  theme: ThemeTable;
  typeface: TypefaceTables;
  typescale: TypescaleTables;
  lineHeight: LineHeightTables;
  letterSpacing: LetterSpacingTables;
  textStyles: TextStylesTables;
  spacing: SpacingTables;
  colorPalette: ColorPaletteTables;
  

  get sections() {
    return [this.typeface, this.typescale, this.lineHeight, this.letterSpacing, this.textStyles, this.spacing, this.colorPalette];
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

    this.version(8).stores(schema);
    
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

class Tables<T extends Table, G extends Table> {
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