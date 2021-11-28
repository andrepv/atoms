import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { pluck } from "rxjs/operators";
import { FontCategory, GoogleFont } from "../typeface-section/typeface.model";
import { FontManagerService } from "../typeface-editor/font-manager.service";

type SortOption = 'popularity' | 'date' | 'alpha' | 'style' | 'trending';

export class TypefaceListGoogleManager {
  readonly API_KEY = 'AIzaSyD2qPnGwH89O2n3-U7OxQETWq4wG1BkAt8';
  readonly BASE_URL = "https://www.googleapis.com/webfonts/v1/webfonts";
  readonly FONT_BASE_URL = "https://fonts.googleapis.com/css";

	readonly SORT_OPTIONS: SortOption[] = ['popularity', 'date', 'alpha', 'style', 'trending'];

	readonly CATEGORIES: FontCategory[] = ["sans-serif", "serif", "display", "handwriting", "monospace"];

	readonly PREVIEW_TEXT = 'Almost before we knew it, we had left the ground.';

	sortOption = this.SORT_OPTIONS[0];
	isLoading = false;

	private selectedCategories = this.CATEGORIES;
	private fontFamily = '';
	private ALL_FONTS: GoogleFont[] = [];

	fonts$ = new BehaviorSubject<GoogleFont[]>([]);

	get fonts() {
		return this.fonts$.getValue()
	}

	set fonts(fonts: GoogleFont[]) {
		this.fonts$.next(fonts);
	}

	get totalFontsCount() {
		return this.ALL_FONTS.length;
	}

  constructor(
		private http: HttpClient,
    private fontManager: FontManagerService,
  ) {}

  loadFonts() {
		this.isLoading = true;
		const params = new HttpParams()
		.set("sort", this.sortOption)
		.set("key", this.API_KEY);

    return this.http.get(this.BASE_URL, {params})
		.pipe(pluck('items'))
		.subscribe(fonts => {
			this.ALL_FONTS = fonts as GoogleFont[];

			if (
				this.selectedCategories.length !== this.CATEGORIES.length
				|| this.fontFamily.length
			) {
				this.filterFonts();
			} else {
				this.fonts = this.ALL_FONTS;
			}

			this.isLoading = false;
		})
  }

	sort(option: SortOption) {
		this.sortOption = option;
		this.loadFonts();
	}

	toggleCategory(category: FontCategory, value: boolean) {
		if (!value) {
			this.selectedCategories = this.selectedCategories.filter(item => item !== category);
			this.fonts = this.fonts.filter(font => this.selectedCategories.includes(font.category as FontCategory));

		} else if (value && this.CATEGORIES.includes(category)) {
			this.selectedCategories = [...this.selectedCategories, category];
			this.filterFonts();
		}
	}

	filterByName(value: string) {
		this.fontFamily = value;
		this.filterFonts();
	}

	addStylesheet(options: {
		fonts: GoogleFont[],
		onload?: () => void,
		preview?: boolean
	}) {
		const {fonts, onload = () => {}, preview = true} = options;
    let familiesStr = fonts.map(font => (
      `${font.family}:${preview ? 'regular' : font.variants.join(",")}`
		));

		familiesStr = familiesStr.filter(familyStr => {
			let str = `${familyStr}${preview ? ':preview': ''}`;
			if (this.fontManager.embeddedFonts.has(str)) return false;

			this.fontManager.embeddedFonts.add(str);
			return true;
		});

		if (familiesStr.length) {
	
			const url = this.getQueryURL(preview, familiesStr);
			this.createStylesheet(url).onload = () => onload()

		} else {
			onload();
		}
  }

	private getQueryURL(preview: boolean, familiesStr: string[]) {
		const url = new URL(this.FONT_BASE_URL);
    url.searchParams.append("family", familiesStr.join("|"));

		if (preview) {
			url.searchParams.append("text", this.PREVIEW_TEXT);
		}

    url.searchParams.append("font-display", "swap");

		return url.href;
	}

	private createStylesheet(url: string) {
		const stylesheetNode = document.createElement("link");
		stylesheetNode.setAttribute('rel', 'stylesheet');
		stylesheetNode.setAttribute('href', url);
		document.head.appendChild(stylesheetNode);

		return stylesheetNode;
	}

	private filterFonts() {
		this.fonts = this.ALL_FONTS.filter(font => (
			this.selectedCategories.includes(font.category as FontCategory)
			&& font.family.toLowerCase().includes(this.fontFamily.toLowerCase().trim())
		));
	}
}